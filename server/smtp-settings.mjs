import { randomBytes, randomUUID, createCipheriv, createDecipheriv } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';

export function createSmtpSettings(db, env = process.env) {
  const keyFile = join(dirname(env.BLOG_DB_PATH || resolve('data/blog.sqlite')), 'smtp-settings.key');
  const stored = () => { const row = db.prepare("SELECT value FROM settings WHERE key = 'smtp'").get(); return row ? JSON.parse(row.value) : null; };
  function key(create = false) {
    if (create) {
      mkdirSync(dirname(keyFile), { recursive: true, mode: 0o700 });
      try { writeFileSync(keyFile, randomBytes(32), { flag: 'wx', mode: 0o600 }); } catch (error) { if (error.code !== 'EEXIST') throw error; }
    }
    const value = readFileSync(keyFile);
    if (value.length !== 32) throw new Error('Invalid SMTP encryption key.');
    return value;
  }
  function encrypt(password) {
    const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', key(true), iv);
    const encrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
    return { iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: encrypted.toString('base64') };
  }
  function decrypt(password) {
    const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(password.iv, 'base64'));
    decipher.setAuthTag(Buffer.from(password.tag, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(password.data, 'base64')), decipher.final()]).toString('utf8');
  }
  function config() {
    const value = stored();
    return value ? { SMTP_HOST: value.host, SMTP_PORT: String(value.port), SMTP_USER: value.username, SMTP_FROM: value.from, SMTP_PASSWORD: decrypt(value.password) } : env;
  }
  function publicSettings() {
    const value = stored();
    const host = value?.host ?? env.SMTP_HOST ?? '', username = value?.username ?? env.SMTP_USER ?? '', from = value?.from ?? env.SMTP_FROM ?? '';
    const hasPassword = Boolean(value?.password || env.SMTP_PASSWORD);
    return { host, port: value?.port ?? Number(env.SMTP_PORT || 587), username, from, hasPassword, configured: Boolean(host && username && from && hasPassword), source: value ? 'admin' : 'environment', version: value?.version || '' };
  }
  function save(input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid SMTP settings.');
    const current = publicSettings();
    if (input.version !== current.version) throw new Error('Settings changed in another tab. Reload before saving.');
    for (const [field, limit] of Object.entries({ host: 253, username: 320, from: 254, password: 1000 })) {
      if (typeof input[field] !== 'string' || input[field].length > limit || /[\r\n]/.test(input[field])) throw new Error(`Invalid SMTP ${field}.`);
    }
    const host = input.host.trim().toLowerCase(), username = input.username.trim(), from = input.from.trim(), port = Number(input.port);
    if (!/^(?=.{1,253}$)[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(host) || host.split('.').some(part => !part || part.length > 63 || part.startsWith('-') || part.endsWith('-'))) throw new Error('Enter a valid SMTP hostname without a URL or port.');
    if (![465, 587].includes(port)) throw new Error('Choose port 465 (TLS) or 587 (STARTTLS).');
    if (!username) throw new Error('SMTP username is required.');
    if (!/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(from)) throw new Error('Enter a valid sender email address.');
    if (!input.password && (host !== current.host.toLowerCase() || username !== current.username)) throw new Error('Enter the SMTP password when changing the host or username.');
    const password = input.password || config().SMTP_PASSWORD;
    if (!password) throw new Error('SMTP password is required.');
    const value = { host, username, from, port, password: encrypt(password), version: randomUUID() };
    db.prepare("INSERT OR REPLACE INTO settings VALUES ('smtp', ?)").run(JSON.stringify(value));
    return publicSettings();
  }
  return { config, publicSettings, save };
}
