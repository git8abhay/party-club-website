import http from 'node:http';
import { randomBytes, randomUUID, createHash, scryptSync, timingSafeEqual } from 'node:crypto';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPartnerMailer, createSmtpTransport, validateEnquiry, services } from './partner.mjs';
import { createSmtpSettings } from './smtp-settings.mjs';
import { openStore } from './store.mjs';
import { escape, validatePost, page, articleBody } from './content.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const db = openStore();
const production = process.env.NODE_ENV === 'production';
const origin = (process.env.SITE_URL || (production ? 'https://partyclubapp.com' : 'http://127.0.0.1:5173')).replace(/\/$/, '');
if (production && !origin.startsWith('https://')) throw new Error('Production SITE_URL must use HTTPS.');
const hash = value => createHash('sha256').update(value).digest('hex');
const all = () => db.prepare('SELECT data FROM posts').all().map(row => JSON.parse(row.data));
const published = () => all().filter(p => p.status === 'published').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const get = id => { const row = db.prepare('SELECT data FROM posts WHERE id = ?').get(id); return row && JSON.parse(row.data); };
const send = (res, status, content, type = 'text/html; charset=utf-8') => { res.writeHead(status, { 'Content-Type': type }); res.end(content); };
const json = (res, status, data) => send(res, status, JSON.stringify(data), 'application/json');
async function body(req) {
  let data = '';
  for await (const chunk of req) { data += chunk; if (Buffer.byteLength(data) > 150000) throw Object.assign(new Error('Request too large.'), { status: 413 }); }
  try { return JSON.parse(data); } catch { throw new Error('Invalid request body.'); }
}
const smtpSettings = createSmtpSettings(db);
const partnerBody = readFileSync(resolve(here, 'partner.html'), 'utf8').replace('{{SERVICE_OPTIONS}}', services.map(service => `<option>${escape(service)}</option>`).join(''));
const adminBody = readFileSync(resolve(here, 'admin.html'), 'utf8');
function session(req) {
  const token = /(?:^|;\s*)pc_blog=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
  return token && db.prepare('SELECT * FROM sessions WHERE token = ? AND expires > ?').get(hash(token), Date.now());
}
function document(res, status, options) { send(res, status, page({ origin, ...options })); }
const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  const url = new URL(req.url, origin);
  const path = url.pathname;
  const admin = path.startsWith('/admin') || path.startsWith('/api/blog');
  if (admin) { res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Robots-Tag', 'noindex, nofollow'); res.setHeader('X-Frame-Options', 'DENY'); }
  if (path.startsWith('/blog') || path.startsWith('/partner') || path === '/api/partner' || admin) res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  try {
    if (path === '/api/partner') {
      res.setHeader('Cache-Control', 'no-store');
      if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
      if (req.headers.origin !== origin) return json(res, 403, { error: 'Please submit the form from our website.' });
      if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'Please use the enquiry form or email support@partyclubapp.com.' });
      const ip = `partner:${hash(req.socket.remoteAddress)}`;
      db.prepare('DELETE FROM attempts WHERE expires < ?').run(Date.now());
      if ((db.prepare('SELECT count FROM attempts WHERE ip = ?').get(ip)?.count || 0) >= 5) {
        res.setHeader('Retry-After', '900');
        return json(res, 429, { error: 'Too many enquiries. Please try again in 15 minutes or email support@partyclubapp.com.' });
      }
      db.prepare('INSERT INTO attempts VALUES (?, 1, ?) ON CONFLICT(ip) DO UPDATE SET count = count + 1').run(ip, Date.now() + 900000);
      const input = await body(req);
      if (input?.companyWebsite) return json(res, 400, { error: 'Unable to submit this form. Please email support@partyclubapp.com.' });
      const enquiry = validateEnquiry(input);
      let sendPartnerMail;
      try { sendPartnerMail = createPartnerMailer(smtpSettings.config()); }
      catch { return json(res, 503, { error: 'The enquiry form is temporarily unavailable. Please email support@partyclubapp.com.' }); }
      if (!sendPartnerMail) return json(res, 503, { error: 'The enquiry form is temporarily unavailable. Please email support@partyclubapp.com.' });
      try { await sendPartnerMail(enquiry); }
      catch (error) {
        console.error('Partner email failed:', error.code || 'MAIL_DELIVERY_FAILED');
        return json(res, 502, { error: 'We couldn’t send your enquiry. Your details are still in the form. Please try again or email support@partyclubapp.com.' });
      }
      return json(res, 200, { ok: true });
    }
    if (path.startsWith('/api/blog')) {
      if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) return json(res, 405, { error: 'Method not allowed.' });
      if (req.method !== 'GET' && req.headers.origin !== origin) return json(res, 403, { error: 'Untrusted request origin.' });
      if (path === '/api/blog/login' && req.method === 'POST') {
        const stored = db.prepare("SELECT value FROM settings WHERE key = 'password'").get()?.value;
        if (!stored) return json(res, 503, { error: 'Admin is not configured. Run npm run blog:setup on the server first.' });
        const ip = req.socket.remoteAddress;
        db.prepare('DELETE FROM attempts WHERE expires < ?').run(Date.now());
        const attempt = db.prepare('SELECT * FROM attempts WHERE ip = ?').get(ip);
        if (attempt?.count >= 10) return json(res, 429, { error: 'Too many login attempts. Try again in 15 minutes.' });
        const input = await body(req);
        db.prepare('INSERT INTO attempts VALUES (?, 1, ?) ON CONFLICT(ip) DO UPDATE SET count = count + 1').run(ip, Date.now() + 900000);
        const [salt, expected] = stored.split(':');
        if (typeof input.password !== 'string' || input.password.length > 1000 || !timingSafeEqual(scryptSync(input.password, salt, 64), Buffer.from(expected, 'hex'))) return json(res, 401, { error: 'Incorrect password.' });
        db.prepare('DELETE FROM attempts WHERE ip = ?').run(ip);
        db.prepare('DELETE FROM sessions WHERE expires < ?').run(Date.now());
        const token = randomBytes(32).toString('hex'), csrf = randomBytes(32).toString('hex');
        db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(hash(token), csrf, Date.now() + 28800000);
        res.setHeader('Set-Cookie', `pc_blog=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${production ? '; Secure' : ''}`);
        return json(res, 200, { csrf });
      }
      const auth = session(req);
      if (!auth) return json(res, 401, { error: 'Please sign in.' });
      if (req.method !== 'GET' && req.headers['x-csrf-token'] !== auth.csrf) return json(res, 403, { error: 'Invalid session token. Refresh and try again.' });
      if (path === '/api/blog/smtp' && req.method === 'GET') return json(res, 200, smtpSettings.publicSettings());
      if (path === '/api/blog/smtp' && req.method === 'PUT') {
        const input = await body(req);
        try { return json(res, 200, smtpSettings.save(input)); }
        catch (error) {
          const message = error.code ? 'Unable to store SMTP credentials. Check the server storage permissions.' : error.message;
          return json(res, 400, { error: message });
        }
      }
      if (path === '/api/blog/smtp/verify' && req.method === 'POST') {
        const input = await body(req);
        if (input.version !== smtpSettings.publicSettings().version) return json(res, 409, { error: 'Settings changed. Reload before checking the connection.' });
        let transport;
        try {
          transport = createSmtpTransport(smtpSettings.config());
          if (!transport) return json(res, 400, { error: 'Save complete SMTP settings first.' });
          await transport.verify();
          return json(res, 200, { message: 'SMTP connection and authentication succeeded. No email was sent; submit a partner enquiry to verify inbox delivery.' });
        } catch { return json(res, 502, { error: 'Connection check failed. Check the host, port and credentials with your email provider.' }); }
        finally { transport?.close(); }
      }
      if (path === '/api/blog/session' && req.method === 'GET') return json(res, 200, { csrf: auth.csrf });
      if (path === '/api/blog/logout' && req.method === 'POST') {
        db.prepare('DELETE FROM sessions WHERE token = ?').run(auth.token);
        res.setHeader('Set-Cookie', `pc_blog=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${production ? '; Secure' : ''}`);
        return json(res, 200, { ok: true });
      }
      if (path === '/api/blog/posts' && req.method === 'GET') return json(res, 200, all().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
      const id = path.match(/^\/api\/blog\/posts\/([a-f0-9-]+)$/)?.[1];
      if ((path === '/api/blog/posts' && req.method === 'POST') || (id && req.method === 'PUT')) {
        const existing = id ? get(id) : null;
        if (id && !existing) return json(res, 404, { error: 'Article not found.' });
        const input = await body(req);
        if (existing && input.updatedAt !== existing.updatedAt) return json(res, 409, { error: 'This article changed in another tab. Reload before editing.' });
        const data = validatePost(input, existing), now = new Date().toISOString();
        const post = { ...data, id: id || randomUUID(), createdAt: existing?.createdAt || now, updatedAt: now, publishedAt: existing?.publishedAt || (data.status === 'published' ? now : null) };
        try { db.prepare('INSERT INTO posts VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, data=excluded.data').run(post.id, post.slug, JSON.stringify(post)); }
        catch (error) { if (error.message.includes('UNIQUE')) return json(res, 409, { error: 'That URL slug is already used. Choose another.' }); throw error; }
        return json(res, existing ? 200 : 201, post);
      }
      if (id && req.method === 'DELETE') {
        if (!get(id)) return json(res, 404, { error: 'Article not found.' });
        db.prepare('DELETE FROM posts WHERE id = ?').run(id);
        return json(res, 200, { ok: true });
      }
      return json(res, 404, { error: 'Not found.' });
    }
    if (!['GET', 'HEAD'].includes(req.method)) return send(res, 405, 'Method not allowed', 'text/plain');
    if (path === '/partner/') { res.writeHead(301, { Location: '/partner' }); return res.end(); }
    if (path === '/partner') return document(res, 200, { title: 'Partner with PartyClub | Grow Your Celebration Business', description: 'Partner with PartyClub. Tell us about your venue, catering, decor, photography or event services and connect with our team.', path, body: partnerBody });
    if (path === '/admin' || path === '/admin/') return document(res, 200, { title: 'Blog admin | PartyClub India', description: 'Manage PartyClub blog articles.', path: '/admin', noindex: true, body: adminBody });
    if (path.startsWith('/admin/preview/')) {
      if (!session(req)) { res.writeHead(302, { Location: '/admin' }); return res.end(); }
      const post = get(path.slice('/admin/preview/'.length));
      if (!post) return send(res, 404, 'Article not found');
      return document(res, 200, { title: `Preview: ${post.title}`, description: post.excerpt, path, body: articleBody(post), noindex: true });
    }
    if (path === '/blog-sitemap.xml') {
      return send(res, 200, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(origin)}/blog</loc></url>${published().map(p => `<url><loc>${escape(origin)}/blog/${p.slug}</loc><lastmod>${p.updatedAt}</lastmod></url>`).join('')}</urlset>`, 'application/xml');
    }
    if (path === '/blog/' || /^\/blog\/[^/]+\/$/.test(path)) { res.writeHead(301, { Location: path.slice(0, -1) }); return res.end(); }
    if (path === '/blog') {
      const posts = published();
      const cards = posts.map(p => `<article class="card">${p.cover ? `<a href="/blog/${p.slug}" tabindex="-1" aria-hidden="true"><img src="${escape(p.cover)}" alt="" width="640" height="360" loading="lazy"></a>` : ''}<div><span class="eyebrow">${escape(p.category || 'Celebration guides')}</span><h2><a href="/blog/${p.slug}">${escape(p.title)}</a></h2><p>${escape(p.excerpt)}</p><p class="muted">${escape(p.author)} · <time datetime="${p.publishedAt}">${p.publishedAt.slice(0, 10)}</time></p><a href="/blog/${p.slug}">Read article →</a></div></article>`).join('');
      return document(res, 200, { title: 'Celebration Ideas & Planning Guides | PartyClub India Blog', description: 'Explore celebration inspiration, event planning tips and guides from PartyClub India.', path, body: `<main id="main"><section class="intro"><span class="eyebrow">The PartyClub journal</span><h1>A little inspiration.<br>A memorable celebration.</h1><p>Ideas, practical guides and thoughtful details for your next big moment.</p></section>${posts.length ? `<section class="grid" aria-label="Blog articles">${cards}</section>` : '<section class="empty"><h2>Good things are on the way</h2><p>Our celebration guides will appear here soon.</p><a href="/">Explore PartyClub →</a></section>'}</main>` });
    }
    if (path.startsWith('/blog/')) {
      const post = published().find(p => path === `/blog/${p.slug}`);
      if (post) {
        const schema = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BlogPosting', headline: post.title, description: post.seoDescription, datePublished: post.publishedAt, dateModified: post.updatedAt, author: { '@type': 'Person', name: post.author }, publisher: { '@type': 'Organization', name: 'PartyClub India', url: origin, logo: { '@type': 'ImageObject', url: `${origin}/logo_1.png` } }, mainEntityOfPage: `${origin}${path}`, ...(post.cover ? { image: [new URL(post.cover, origin).href] } : {}) }, { '@type': 'BreadcrumbList', itemListElement: ['Home', 'Blog', post.title].map((name, i) => ({ '@type': 'ListItem', position: i + 1, name, item: origin + ['/', '/blog', path][i] })) }] };
        return document(res, 200, { title: post.seoTitle || `${post.title} | PartyClub India`, description: post.seoDescription, path, body: articleBody(post), schema, article: post, image: post.cover, imageAlt: post.coverAlt });
      }
      return document(res, 404, { title: 'Article not found | PartyClub India', description: 'This article is not available.', path, noindex: true, body: '<main id="main" class="empty"><h1>Article not found</h1><p>This article may have been removed or is not yet published.</p><a href="/blog">Browse articles</a></main>' });
    }
    const root = path.startsWith('/blog-assets/') ? here : resolve('dist');
    const relative = path.startsWith('/blog-assets/') ? path.slice('/blog-assets/'.length) : decodeURIComponent(path).slice(1);
    const file = resolve(root, relative);
    const allowedAsset = root !== here || ['blog.css', 'admin.js', 'partner.js'].includes(relative);
    if (allowedAsset && file.startsWith(root + '/') && existsSync(file) && statSync(file).isFile()) {
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4', '.json': 'application/json' };
      return send(res, 200, readFileSync(file), types[extname(file)] || 'application/octet-stream');
    }
    if (['/', '/privacy', '/terms', '/cookies', '/data-deletion', '/data-retention', '/refund-policy'].includes(path) && existsSync(resolve('dist/index.html'))) return send(res, 200, readFileSync(resolve('dist/index.html')));
    return send(res, 404, 'Not found', 'text/plain');
  } catch (error) {
    console.error(error.message);
    return json(res, error.status || 400, { error: error.message.includes('SQLITE') ? 'Unable to save. Please try again.' : error.message });
  }
});
server.listen(Number(process.env.BLOG_PORT || 3001), process.env.BLOG_HOST || '127.0.0.1', () => console.log(`Blog server: http://${process.env.BLOG_HOST || '127.0.0.1'}:${process.env.BLOG_PORT || 3001}`));
