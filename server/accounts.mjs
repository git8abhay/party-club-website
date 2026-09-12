import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
export function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) throw new Error('Use a password between 12 and 128 characters.');
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
const dummy = hashPassword('unused-dummy-password');
export function matchesPassword(password, stored = dummy) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const [salt, expected] = stored.split(':');
  const actual = scryptSync(password, salt, 64), expectedBytes = Buffer.from(expected, 'hex');
  return actual.length === expectedBytes.length && timingSafeEqual(actual, expectedBytes);
}
export const publicUser = user => ({ id: user.id, name: user.name, username: user.username, email: user.email, role: user.role, active: Boolean(user.active), version: user.version });
export function createAccounts(db) {
  const get = id => db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  const find = login => typeof login === 'string' && login.length <= 254 ? db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE').get(login.trim(), login.trim()) : null;
  function save(input, actorId, id) {
    const existing = id ? get(id) : null;
    if (id && !existing) throw new Error('Account not found.');
    if (existing && input.version !== existing.version) throw new Error('This account changed. Reload the account list before saving.');
    for (const [field, max] of Object.entries({ name: 100, username: 64, email: 254 })) {
      if (typeof input[field] !== 'string' || !input[field].trim() || input[field].length > max || /[\r\n]/.test(input[field])) throw new Error(`Enter a valid ${field}.`);
    }
    const name = input.name.trim(), username = input.username.trim().toLowerCase(), email = input.email.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) throw new Error('Username must be 3–64 letters, numbers, dots, underscores or hyphens.');
    if (!/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email)) throw new Error('Enter a valid email address.');
    if (!['admin', 'editor'].includes(input.role) || typeof input.active !== 'boolean') throw new Error('Select a valid role and account status.');
    if (existing && actorId === id && (!input.active || input.role !== existing.role)) throw new Error('You cannot disable your own account or change your own role.');
    if (existing?.active && existing.role === 'admin' && (!input.active || input.role !== 'admin') && db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND active = 1").get().count <= 1) throw new Error('At least one active administrator is required.');
    if (db.prepare('SELECT id FROM users WHERE (username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE) AND id != ?').get(username, email, id || '')) throw new Error('That username or email is already in use.');
    const passwordHash = input.password ? hashPassword(input.password) : existing?.passwordHash;
    if (!passwordHash) throw new Error('A password is required for a new account.');
    const user = { id: id || randomUUID(), name, username, email, role: input.role, active: Number(input.active), passwordHash, version: randomUUID() };
    db.prepare('INSERT INTO users (id,name,username,email,role,active,passwordHash,version) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,username=excluded.username,email=excluded.email,role=excluded.role,active=excluded.active,passwordHash=excluded.passwordHash,version=excluded.version').run(user.id, name, username, email, user.role, user.active, passwordHash, user.version);
    if (existing && (input.password || !input.active || existing.role !== user.role)) db.prepare('DELETE FROM sessions WHERE userId = ?').run(user.id);
    return publicUser(user);
  }
  function authenticate(login, password) {
    const user = find(login);
    const valid = matchesPassword(password, user?.passwordHash);
    return user?.active && valid ? user : null;
  }
  function changePassword(id, currentPassword, newPassword) {
    const user = get(id);
    if (!user || !matchesPassword(currentPassword, user.passwordHash)) throw new Error('Current password is incorrect.');
    db.prepare('UPDATE users SET passwordHash = ?, version = ? WHERE id = ?').run(hashPassword(newPassword), randomUUID(), id);
    db.prepare('DELETE FROM sessions WHERE userId = ?').run(id);
  }
  return { get, find, save, authenticate, changePassword, list: () => db.prepare('SELECT * FROM users ORDER BY name').all().map(publicUser) };
}
