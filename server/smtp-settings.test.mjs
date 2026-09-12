import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { openStore } from './store.mjs';
import { createSmtpSettings } from './smtp-settings.mjs';
test('SMTP settings persist encrypted, redact passwords, support updates and preserve environment fallback', () => {
  const dir = mkdtempSync(join(tmpdir(), 'smtp-settings-'));
  const env = { BLOG_DB_PATH: join(dir, 'test.sqlite'), SMTP_HOST: 'smtp.example.com', SMTP_PORT: '587', SMTP_USER: 'sender', SMTP_PASSWORD: 'original-secret', SMTP_FROM: 'sender@example.com' };
  const db = openStore(env.BLOG_DB_PATH);
  try {
    const settings = createSmtpSettings(db, env);
    assert.equal(settings.config().SMTP_PASSWORD, 'original-secret');
    assert.equal(settings.publicSettings().source, 'environment');
    assert.doesNotMatch(JSON.stringify(settings.publicSettings()), /original-secret/);
    const input = { host: env.SMTP_HOST, port: 465, username: env.SMTP_USER, from: env.SMTP_FROM, password: '', version: '' };
    let saved = settings.save(input);
    assert.equal(saved.source, 'admin'); assert.equal(saved.hasPassword, true);
    assert.equal(settings.config().SMTP_PASSWORD, 'original-secret');
    assert.doesNotMatch(db.prepare("SELECT value FROM settings WHERE key='smtp'").get().value, /original-secret/);
    assert.equal(statSync(join(dir, 'smtp-settings.key')).mode & 0o777, 0o600);
    assert.equal(readFileSync(join(dir, 'smtp-settings.key')).length, 32);
    assert.throws(() => settings.save(input), /another tab/);
    assert.throws(() => settings.save({ ...input, version: saved.version, host: 'different.example.com' }), /password when changing/);
    for (const change of [{ host: 'https://smtp.example.com' }, { port: 25 }, { from: 'bad' }, { username: 'a\r\nb' }]) assert.throws(() => settings.save({ ...input, version: saved.version, ...change }));
    saved = settings.save({ ...input, version: saved.version, password: 'updated-secret' });
    assert.equal(createSmtpSettings(db, env).config().SMTP_PASSWORD, 'updated-secret');
    assert.doesNotMatch(JSON.stringify(saved), /updated-secret/);
    rmSync(join(dir, 'smtp-settings.key'));
    assert.throws(() => settings.config());
  } finally { db.close(); rmSync(dir, { recursive: true, force: true }); }
});
