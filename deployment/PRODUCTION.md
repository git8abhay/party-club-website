# Production release: partyclubapp.com

Verified destination: 27.100.38.223 (trusted SSH host), Ubuntu 24.04, nginx, system Node 20.20.2.
Previous static root retained for rollback: /home/partyclubapp.com/public_html.
Current nginx virtual hosts: /etc/nginx/sites-enabled/partyclub.

Deployed on 12 September 2026 after explicit authorization for the isolated website setup. Node v24.21.0 is installed in the dedicated runtime. Main website: /opt/partyclub-website/current → releases/20260912-accounts. The account update preserves all blog and SMTP data; /opt/partyclub-website/backups/before-accounts.sqlite contains the pre-migration database. Service: partyclub-website.service on 127.0.0.1:3105. The original static root is preserved, and all other nginx virtual-host blocks were verified unchanged.

Deployment procedure used:

1. Download the current Node 24 Linux x64 archive and verify its published SHA-256 checksum from nodejs.org. Install it only under /opt/partyclub-website/runtime, leaving system Node unchanged.
2. Create system user partyclub-site, with no login shell, and private persistent directory /var/lib/partyclub-website.
3. Back up the dereferenced nginx configuration with cp -pL. Preserve the existing public_html directory for rollback.
4. Upload the prepared dist/, server/, package.json and package-lock.json into /opt/partyclub-website/releases/20260912-cms. Run npm ci --omit=dev using the isolated runtime. Point /opt/partyclub-website/current at that release.
5. Create a separate production administrator using server/setup.mjs and a generated password. Do not copy local test databases or local admin credentials. Store the password securely for delivery to the owner.
6. Install the adjacent systemd service and start it on private port 3105. Check local /blog, /partner, /admin and authenticated CMS endpoints before changing nginx.
7. Update only the partyclubapp.com website block: set root to /opt/partyclub-website/current/dist, replace SPA fallback with the snippet below, and permit HTTPS images for blog cover URLs. Set `client_max_body_size 10M` for the image upload endpoint. Keep the existing TLS certificates and other subdomain upstreams unchanged. Preserve /data-deletion redirect and existing HTTP canonical redirects.
8. Validate nginx -t, then reload. Restore the backed-up config on validation failure. Check public pages, assets, canonical URLs, 404s, HTTPS session cookies, login and SMTP settings. No real email should be sent until SMTP is configured.

Website routing replacement:

```nginx
location / {
    try_files $uri $uri/ @partyclub_website;
}
location @partyclub_website {
    proxy_pass http://127.0.0.1:3105;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Rollback: restore the original nginx config and reload after nginx -t. This restores the original static root; stop the new website service if necessary. Other app services are not part of this release.


Account release (12 September 2026): replaced shared-password login with individual admin/editor accounts. Username/email login, own password changes, account administration and per-user session revocation are available at /admin. This update restarted only partyclub-website.service and made no nginx changes.

Visual editor release (21 September 2026): current → releases/20260921-editor. Added locally served Quill assets and sanitized HTML article storage while retaining legacy Markdown rendering. Existing article, account and SMTP data were retained. Database backup: /opt/partyclub-website/backups/before-editor-20260921.sqlite. Only partyclub-website.service was restarted; nginx and other portals were unchanged. Public HTTPS editor assets verified; browser visual verification was unavailable during this release.

Featured image upload release (22 September 2026): current → releases/20260922-featured-upload. Added authenticated JPG/PNG/WebP uploads (8 MB maximum) with persistent storage under /var/lib/partyclub-website/uploads, while retaining existing article data. Updated only partyclub-website.service; nginx and other portals were unchanged. Public HTTPS admin, upload script, blog page, and unauthenticated upload protection were verified.
