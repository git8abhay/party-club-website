import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPartnerMailer, partnerRecipient, validateEnquiry } from './partner.mjs';
const valid = { name: 'Sample Partner', business: 'Example Events', email: 'partner@example.com', phone: '+91 98765 43210', city: 'Delhi', service: 'Event planning', message: 'We plan birthday parties.', consent: true };
const env = { SMTP_HOST: 'smtp.example.com', SMTP_USER: 'test', SMTP_PASSWORD: 'test', SMTP_FROM: 'website@example.com' };
test('partner validation rejects invalid contact details, missing consent and header injection', () => {
  assert.equal(validateEnquiry(valid).name, valid.name);
  for (const changes of [{ email: 'bad email' }, { phone: '123' }, { consent: false }, { service: 'Unknown' }, { name: '' }, { business: 'Business\r\nBcc: someone@example.com' }, { email: 'a@example.com\nBcc:a@example.com' }, { message: 'x'.repeat(3001) }]) assert.throws(() => validateEnquiry({ ...valid, ...changes }));
  assert.throws(() => validateEnquiry(null));
});
test('SMTP notification uses a fixed recipient, verified sender and applicant reply address', async () => {
  let options, mail;
  const sender = createPartnerMailer(env, config => { options = config; return { sendMail: async message => { mail = message; return { accepted: [partnerRecipient] }; } }; });
  await sender(validateEnquiry({ ...valid, to: 'attacker@example.com' }));
  assert.equal(mail.to, 'support@partyclubapp.com'); assert.equal(mail.from.address, env.SMTP_FROM); assert.equal(mail.replyTo.address, valid.email);
  for (const value of [valid.name, valid.business, valid.phone, valid.city, valid.service, valid.message]) assert.ok(mail.text.includes(value));
  assert.equal(options.requireTLS, true); assert.equal(options.secure, false); assert.equal(options.disableFileAccess, true);
  createPartnerMailer({ ...env, SMTP_PORT: '465' }, config => { assert.equal(config.secure, true); return {}; });
});
test('SMTP failures and rejected recipient never report success; missing settings disable sending', async () => {
  assert.equal(createPartnerMailer({}), null);
  assert.throws(() => createPartnerMailer({ ...env, SMTP_PORT: '25' }));
  const rejected = createPartnerMailer(env, () => ({ sendMail: async () => ({ accepted: [] }) }));
  await assert.rejects(rejected(valid), /did not accept/);
  const failed = createPartnerMailer(env, () => ({ sendMail: async () => { throw new Error('SMTP unavailable'); } }));
  await assert.rejects(failed(valid), /SMTP unavailable/);
});
