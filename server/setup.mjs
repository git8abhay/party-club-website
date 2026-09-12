import { randomBytes, scryptSync } from 'node:crypto';
import { openStore } from './store.mjs';
const password = process.env.BLOG_ADMIN_PASSWORD;
if (!password || password.length < 14) {
  console.error('Set BLOG_ADMIN_PASSWORD to a unique password of at least 14 characters, then run npm run blog:setup.');
  process.exit(1);
}
const db = openStore();
const salt = randomBytes(16).toString('hex');
db.prepare('INSERT OR REPLACE INTO settings VALUES (?, ?)').run('password', `${salt}:${scryptSync(password, salt, 64).toString('hex')}`);
db.exec('DELETE FROM sessions; DELETE FROM attempts;');
db.close();
console.log('Blog administrator password saved securely. Sign in at /admin.');
