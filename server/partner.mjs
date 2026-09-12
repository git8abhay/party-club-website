import nodemailer from 'nodemailer';
export const partnerRecipient = 'support@partyclubapp.com';
export const services = ['Venues', 'Decoration', 'Catering', 'Photography & videography', 'DJs & entertainment', 'Cakes', 'Event planning', 'Party rentals', 'Other'];
const emailPattern = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
export function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Please complete the form.');
  const result = {};
  const labels = { name: 'Your name', business: 'Business name', email: 'Email', phone: 'Phone number', city: 'City', service: 'Service', message: 'Message' };
  for (const [key, limit] of Object.entries({ name: 100, business: 150, email: 254, phone: 25, city: 100, service: 80, message: 3000 })) {
    if (typeof input[key] !== 'string' || input[key].length > limit || (key !== 'message' && [...input[key]].some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127))) throw new Error(`Please enter a valid ${labels[key].toLowerCase()}.`);
    result[key] = input[key].trim();
    if (key !== 'message' && !result[key]) throw new Error(`${labels[key]} is required.`);
  }
  if (!emailPattern.test(result.email)) throw new Error('Please enter a valid email address.');
  const digits = result.phone.replace(/\D/g, '');
  if (!/^\+?[0-9 ()-]+$/.test(result.phone) || digits.length < 7 || digits.length > 15) throw new Error('Please enter a valid phone number with country code.');
  if (!services.includes(result.service)) throw new Error('Please select a service.');
  if (input.consent !== true) throw new Error('Please agree to be contacted about your enquiry.');
  return result;
}
export function createSmtpTransport(env = process.env, createTransport = nodemailer.createTransport) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD || !env.SMTP_FROM) return null;
  const port = Number(env.SMTP_PORT || 587);
  if (![465, 587].includes(port) || !emailPattern.test(env.SMTP_FROM) || /[\r\n]/.test(env.SMTP_FROM)) throw new Error('Invalid SMTP configuration. Use port 465 or 587 and a plain sender email address.');
  return createTransport({
    host: env.SMTP_HOST, port, secure: port === 465, requireTLS: true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
  });
}
export function createPartnerMailer(env = process.env, createTransport = nodemailer.createTransport) {
  const transport = createSmtpTransport(env, createTransport);
  if (!transport) return null;
  return async enquiry => {
    const result = await transport.sendMail({
      from: { name: 'PartyClub Partnerships', address: env.SMTP_FROM },
      to: partnerRecipient,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: `Partner enquiry: ${enquiry.business}`,
      text: `New PartyClub partnership enquiry\n\nName: ${enquiry.name}\nBusiness: ${enquiry.business}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nCity: ${enquiry.city}\nService: ${enquiry.service}\n\nMessage:\n${enquiry.message || '(No additional message)'}\n\nThe applicant agreed to be contacted about this enquiry.\n`,
    });
    if (!result.accepted?.some(address => String(address).toLowerCase() === partnerRecipient)) throw new Error('The mail server did not accept the recipient.');
  };
}
