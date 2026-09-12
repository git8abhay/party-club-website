import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openStore } from './store.mjs';
import { createAccounts, matchesPassword } from './accounts.mjs';
test('individual accounts, case-insensitive login, duplicate checks, revocation and last-admin protection', () => {
  const db = openStore(':memory:');
  const accounts = createAccounts(db);
  const input = { name: 'Owner', username: 'owner', email: 'owner@example.com', password: 'Owner-password-123', role: 'admin', active: true };
  try {
    const owner = accounts.save(input);
    assert.equal(accounts.authenticate('OWNER', input.password).id, owner.id);
    assert.equal(accounts.authenticate(' OWNER@EXAMPLE.COM ', input.password).id, owner.id);
    assert.equal(accounts.authenticate('owner', 'wrong'), null);
    assert.equal(accounts.authenticate('missing', 'wrong'), null);
    assert.doesNotMatch(JSON.stringify(accounts.list()), /passwordHash|Owner-password/);
    assert.throws(() => accounts.save({ ...input, username: 'OWNER', email: 'other@example.com' }), /already in use/);
    assert.throws(() => accounts.save({ ...input, username: 'other', email: 'OWNER@example.com' }), /already in use/);
    assert.throws(() => accounts.save({ ...input, password: 'short', username: 'short', email: 'short@example.com' }), /12 and 128/);
    assert.throws(() => accounts.save({ ...input, password: '', active: false, version: owner.version }, owner.id, owner.id), /own account/);
    assert.throws(() => accounts.save({ ...input, password: '', active: false, version: owner.version }, null, owner.id), /At least one/);
    let editor = accounts.save({ ...input, username: 'editor', email: 'editor@example.com', role: 'editor' }, owner.id);
    db.prepare('INSERT INTO sessions (token,csrf,expires,userId) VALUES (?,?,?,?)').run('token','csrf',Date.now()+60000,editor.id);
    editor = accounts.save({ ...editor, password: '', active: false }, owner.id, editor.id);
    assert.equal(accounts.authenticate('editor', input.password), null);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM sessions').get().count, 0);
    editor = accounts.save({ ...editor, password: 'Replacement-password-123', active: true }, owner.id, editor.id);
    assert.ok(accounts.authenticate('editor', 'Replacement-password-123'));
    assert.throws(() => accounts.changePassword(editor.id, 'wrong', 'Different-password-123'), /incorrect/);
    accounts.changePassword(editor.id, 'Replacement-password-123', 'Different-password-123');
    assert.ok(accounts.authenticate('editor', 'Different-password-123'));
    assert.equal(accounts.authenticate('editor', 'Replacement-password-123'), null);
    assert.equal(matchesPassword('bad', accounts.get(editor.id).passwordHash), false);
  } finally { db.close(); }
});
