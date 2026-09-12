export const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const slugify = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function safeImage(value) {
  if (!value) return true;
  if (/^\/(?!\/)[a-zA-Z0-9/_.-]+$/.test(value)) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
// Deliberately supports text, headings, lists and emphasis; raw HTML is always escaped.
export function markdown(text) {
  const inline = text => escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return text.trim().split(/\n\s*\n/).filter(Boolean).map(block => {
    if (/^#{1,3} /.test(block)) return block.split('\n').map(line => {
      const match = line.match(/^(#{1,3}) (.*)$/);
      return match ? `<h${Math.max(2, match[1].length)}>${inline(match[2])}</h${Math.max(2, match[1].length)}>` : `<p>${inline(line)}</p>`;
    }).join('');
    if (block.split('\n').every(line => /^- /.test(line))) return `<ul>${block.split('\n').map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    return `<p>${inline(block).replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
}
export function validatePost(input, existing) {
  const post = {};
  for (const [key, max] of Object.entries({ title: 160, slug: 100, excerpt: 400, content: 100000, author: 100, category: 80, cover: 2000, coverAlt: 200, seoTitle: 70, seoDescription: 170 })) {
    if (typeof input[key] !== 'string' || input[key].length > max) throw new Error(`Invalid ${key} (maximum ${max} characters).`);
    post[key] = input[key].trim();
  }
  if (!post.title || !post.author || !post.content) throw new Error('Title, author and article content are required.');
  post.slug = post.slug || slugify(post.title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error('Use lowercase letters, numbers and hyphens in the URL slug.');
  if (existing?.publishedAt && post.slug !== existing.slug) throw new Error('The URL cannot change after first publication.');
  if (!safeImage(post.cover)) throw new Error('Use an HTTPS image URL or a local image path.');
  if (post.cover && !post.coverAlt) throw new Error('Add descriptive alternative text for the cover image.');
  if (!['draft', 'published'].includes(input.status)) throw new Error('Invalid status.');
  post.status = input.status;
  if (post.status === 'published' && (!post.excerpt || !post.seoDescription)) throw new Error('An excerpt and SEO description are required to publish.');
  return post;
}
export function page({ title, description, path, body, origin, image, imageAlt = '', schema, noindex = false, article }) {
  const url = origin + path;
  return `<!doctype html><html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}"><link rel="canonical" href="${escape(url)}"><link rel="icon" href="/favicon.png"><link rel="stylesheet" href="/blog-assets/blog.css"><meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(url)}"><meta property="og:site_name" content="PartyClub India"><meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">${image ? `<meta property="og:image" content="${escape(new URL(image, origin).href)}"><meta property="og:image:alt" content="${escape(imageAlt)}">` : ''}${article ? `<meta property="article:published_time" content="${article.publishedAt}"><meta property="article:modified_time" content="${article.updatedAt}"><meta name="author" content="${escape(article.author)}">` : ''}${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}</head><body><a class="skip" href="#main">Skip to content</a><header><a href="/" aria-label="PartyClub home"><img src="/logo_1.png" alt="PartyClub India" width="140"></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/blog">Blog</a><a class="button" href="/#download">Get the app</a></nav></header>${body}<footer><a href="/">PartyClub India</a><span>Make every celebration your own.</span><a href="/privacy">Privacy policy</a></footer></body></html>`;
}
export function articleBody(post) {
  return `<main id="main" class="article"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span>${escape(post.title)}</span></nav><span class="eyebrow">${escape(post.category || 'Celebration guides')}</span><h1>${escape(post.title)}</h1><p class="lead">${escape(post.excerpt)}</p><p class="muted">By ${escape(post.author)} · <time datetime="${post.publishedAt || post.updatedAt}">${new Date(post.publishedAt || post.updatedAt).toLocaleDateString('en-IN', { dateStyle: 'long', timeZone: 'Asia/Kolkata' })}</time> · ${Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read</p>${post.cover ? `<img class="cover" src="${escape(post.cover)}" alt="${escape(post.coverAlt)}" width="1200" height="675" fetchpriority="high">` : ''}<article class="prose">${markdown(post.content)}</article><aside class="callout"><h2>Bring your celebration to life</h2><p>Discover venues, decorators, caterers and more with PartyClub.</p><a class="button" href="/#download">Explore the app</a></aside><a href="/blog">← All articles</a></main>`;
}
