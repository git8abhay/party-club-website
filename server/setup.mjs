import { openStore } from './store.mjs';
import { createAccounts } from './accounts.mjs';
const db = openStore();
try {
  const accounts = createAccounts(db);
  const username = process.env.BLOG_ADMIN_USERNAME;
  const email = process.env.BLOG_ADMIN_EMAIL;
  if (!username || !email || !process.env.BLOG_ADMIN_PASSWORD) throw new Error('Set BLOG_ADMIN_USERNAME, BLOG_ADMIN_EMAIL and BLOG_ADMIN_PASSWORD (12–128 characters).');
  const existing = accounts.find(username);
  if (existing && process.env.BLOG_ADMIN_RESET !== 'true') throw new Error('Account exists. Set BLOG_ADMIN_RESET=true only for an intentional password reset.');
  accounts.save({ name: process.env.BLOG_ADMIN_NAME || 'Website Administrator', username, email, role: 'admin', active: true, password: process.env.BLOG_ADMIN_PASSWORD, version: existing?.version }, null, existing?.id);
  db.prepare("DELETE FROM settings WHERE key = 'password'").run();
  console.log('Administrator account saved. Sign in with username or email at /admin.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { db.close(); }
