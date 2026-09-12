const form = document.getElementById('partner-form');
const status = document.getElementById('partner-status');
const button = form.querySelector('button[type="submit"]');
let submitting = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting || !form.reportValidity()) return;
  submitting = true; button.disabled = true; button.textContent = 'Sending…';
  status.className = ''; status.textContent = 'Sending your enquiry…';
  const data = Object.fromEntries(new FormData(form));
  data.consent = form.elements.namedItem('consent').checked;
  try {
    const response = await fetch('/api/partner', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'We couldn’t send your enquiry. Please try again.');
    form.reset(); status.className = 'success'; status.textContent = 'Thank you! Your enquiry has been sent to our team. We’ll be in touch using the details you provided.';
  } catch (error) {
    status.className = 'error'; status.textContent = error instanceof TypeError ? 'Connection interrupted. Please try again, or email support@partyclubapp.com.' : error.message;
  } finally {
    submitting = false; button.disabled = false; button.textContent = 'Send enquiry →'; status.focus();
  }
});
