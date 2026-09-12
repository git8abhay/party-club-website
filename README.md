# PartyClub website and blog CMS

Requires **Node.js 24 or newer**. The React landing page uses Vite; the blog uses a small Node server and persistent SQLite storage. Nodemailer handles SMTP delivery for partner enquiries.

## Local development

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173, `/blog` for articles, and `/admin` for the CMS. `npm run dev` starts Vite on 5173 and the blog backend on 3001. Use the exact 127.0.0.1 address: authenticated writes validate the configured origin.

Configure the administrator once (or reset the password) in zsh:

```sh
read -s 'BLOG_ADMIN_PASSWORD?New admin password (at least 14 characters): '
export BLOG_ADMIN_PASSWORD
npm run blog:setup
unset BLOG_ADMIN_PASSWORD
```

The password is stored as a salted scrypt hash. Resetting it signs out existing sessions. If a local `data/admin-login.txt` was generated during setup, it contains the initial local credentials; it is ignored by Git and must never be deployed.

## Writing articles

1. Sign in at `/admin`, then choose **New article**.
2. Add a title, author and content. Add an excerpt, category and optional cover image URL with descriptive alt text.
3. Use blank lines between paragraphs, `##` for section headings, `###` for subsections, `-` for bullet lists, `**bold**` and `*italic*`. Raw HTML is escaped. The title provides the sole H1.
4. Fill in the SEO title (optional override) and SEO description. The preview shows the approximate search appearance; search engines may rewrite it.
5. Save as **Draft**, then open **Preview saved article**. Preview shows the last saved version and requires login.
6. Select **Published** and save to publish. Change back to **Draft** and save to unpublish. Deletion is permanent and requires confirmation.

Published slugs are fixed to preserve links. Draft URLs return 404 to the public. Publishing changes are immediately visible without a rebuild. Posts persist across server restarts and deployments. Concurrent edits are rejected if another tab saved a newer version. This is a single-administrator CMS with image URLs, not file uploads or a media library.

## SEO

- `/blog` and `/blog/descriptive-slug` return complete HTML without JavaScript.
- Unique titles, meta descriptions, canonical URLs, Open Graph and social card metadata.
- One article H1, H2/H3 sections, descriptive image alt text, author and publication date.
- `BlogPosting` and `BreadcrumbList` JSON-LD on published articles.
- `/blog-sitemap.xml` dynamically includes only published posts and their modification dates; `robots.txt` references both sitemaps.
- Trailing slash redirects and actual 404 responses for unavailable articles.
- Admin and authenticated previews use `noindex` and `Cache-Control: no-store`.

## Production deployment

**This is no longer a static-only site. Uploading only `dist/` to Apache/XAMPP will not run the CMS.** Deploy `dist/`, `server/`, `package.json`, and `package-lock.json` to an application directory and run the Node service behind an HTTPS reverse proxy. `deploy.sh` uploads this structure and does not restart remote services. It never syncs or deletes the `data/` directory. `DEPLOY_PATH` now refers to the application directory, not the static web root.

```sh
npm run build
# On the server, use a persistent directory outside the public web root:
export BLOG_DB_PATH=/var/lib/partyclub/blog.sqlite
export SITE_URL=https://partyclubapp.com
# Set BLOG_ADMIN_PASSWORD securely, then run npm run blog:setup once.
npm start
```

Run `npm ci --omit=dev` in the production application directory to install runtime dependencies. Run `npm start` under a service manager with the same `BLOG_DB_PATH` and `SITE_URL` environment. Default bind address is `127.0.0.1:3001`. Optional `BLOG_HOST` and `BLOG_PORT` configure it. Production sessions require HTTPS. `SITE_URL` must exactly match the public HTTPS origin; redirect alternate hostnames at the proxy. Keep the Node port private.

Example nginx location inside the HTTPS virtual host:

```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

The Node server serves built landing-page assets, policy routes, the blog, admin and API. Do not expose the application directory, database or credentials as a static web root. Login attempts are limited per backend connection address (a conservative shared limit behind a proxy).

Back up SQLite using the SQLite backup API/tool, or stop the service before copying the database and associated WAL files. Keep backups outside the public web root. Publishing does not guarantee search indexing or rankings.

## Verification

```sh
npm run build
npm run test:blog
npm run lint
```

The integration tests use an isolated temporary database and port 3198. They cover authentication, origin/CSRF checks, input validation and escaping, draft privacy, publication, SEO HTML/schema, sitemap changes, fixed published URLs, concurrent edits, restart persistence, unpublishing, deletion and logout.

## Partner enquiry form

`/partner` collects name, business, email, phone, city, service and an optional message. All **Partner with us** buttons link to this page. `POST /api/partner` validates fields and sends a plain-text notification to **support@partyclubapp.com**; Reply-To is the applicant’s email address. The destination cannot be changed by form input.

Open **Admin → SMTP settings** and enter your sending provider’s SMTP host, port, username, password and authorized sender address. Save to apply changes immediately. Alternatively, copy `.env.example` to `.env` to provide initial server-side settings. Saved admin settings take precedence over environment settings. `npm run dev` and `npm start` load `.env`; restart after changing it. For production set `SITE_URL=https://partyclubapp.com`. Port 465 uses implicit TLS; port 587 requires STARTTLS. Credentials stay on the server and are never included in the website bundle. See [Nodemailer SMTP configuration](https://nodemailer.com/smtp).

There is no mailto submission redirect and no simulated delivery. A success response is returned only after SMTP accepts the email for support@partyclubapp.com; this confirms handoff, not final inbox delivery. Missing credentials, failed delivery and validation errors preserve the applicant’s form entries and provide the direct support email as a fallback. Enquiry contents are not saved in SQLite or application logs.

Spam controls include same-origin checks, a hidden trap field, field size limits, contact consent and a maximum of five submission attempts per backend connection address per 15 minutes. Like the CMS login limiter, this is a conservative shared limit behind a reverse proxy; forwarded IP headers are not trusted. Configure an appropriate edge rate limit for high-volume deployments.

Run `npm test` for CMS and partner tests. Tests simulate the SMTP transport and never send real email. Before launch, configure the provider, then submit a real test enquiry and confirm it arrives in support@partyclubapp.com. Ensure your provider’s sender/domain verification is complete.

### SMTP settings in Admin

Sign in at `/admin` and expand **SMTP settings**. Choose port 587 (STARTTLS) or 465 (SSL/TLS), add your username/app password and authorized sender email, then save. Leaving the password blank retains the saved password. Changing the host or username requires entering the password again. The enquiry recipient stays fixed at `support@partyclubapp.com`.

**Check saved connection** checks the saved server connection and authentication without sending an email. Save edits before checking. A successful check does not prove that the sender is authorized or that email reaches the inbox; submit a partner enquiry to check actual delivery. Connection failures preserve saved settings so they can be corrected.

Admin settings persist in SQLite and apply to the next submission without a restart. SMTP passwords are encrypted using AES-256-GCM and never returned through the settings API. The encryption key is generated on first save as `smtp-settings.key` next to the SQLite database, with owner-only file permissions. Back up both the database and this key securely outside the public web root; losing the key requires re-entering the SMTP password. Neither should be included in source control or static deployments. Authenticated settings writes and connection checks use the existing session, origin and CSRF protections.
