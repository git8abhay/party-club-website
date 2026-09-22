import { setupAccounts } from './accounts.js';
const $ = id => document.getElementById(id);
const form = $('editor');
let smtpDirty = false, smtpVersion = '';
let currentUser = null;
let csrf = '', posts = [], current = null, dirty = false, busy = false;
const field = name => form.elements.namedItem(name);
const articleEditor = new window.Quill('#article-rich-editor', {
  theme: 'snow', placeholder: 'Write your article here…',
  formats: ['header', 'bold', 'italic', 'underline', 'list', 'blockquote', 'link'],
  modules: { toolbar: '#article-toolbar', history: { userOnly: true } },
});
articleEditor.root.setAttribute('role', 'textbox');
articleEditor.root.setAttribute('aria-multiline', 'true');
articleEditor.root.setAttribute('aria-labelledby', 'article-content-label');
articleEditor.on('text-change', (_delta, _old, source) => { if (source === 'user') dirty = true; });
$('article-undo').onclick = () => articleEditor.history.undo();
$('article-redo').onclick = () => articleEditor.history.redo();

const notice = (text, error = false) => { $('message').textContent = text; $('message').className = error ? 'error' : 'success'; };
async function api(path, method = 'GET', data) {
  const response = await fetch('/api/blog' + path, { method, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, ...(data ? { body: JSON.stringify(data) } : {}) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Request failed. Please try again.');
  return result;
}
function showWorkspace(show) { $('login').hidden = show; $('workspace').hidden = !show; $('logout').hidden = !show; accountControls.show(show ? currentUser : null); $('smtp-panel').hidden = !show || currentUser?.role !== 'admin'; if (show && currentUser?.role === 'admin') void loadSmtp(); else { $('smtp-form').reset(); $('smtp-fields').disabled = true; smtpDirty = false; smtpVersion = ''; $('smtp-panel').open = false; $('smtp-status').textContent = ''; } }
async function refresh() {
  posts = await api('/posts');
  $('count').textContent = `(${posts.length})`;
  $('posts').replaceChildren();
  if (!posts.length) { const p = document.createElement('p'); p.textContent = 'No articles yet. Create your first draft to get started.'; $('posts').append(p); }
  for (const post of posts) {
    const row = document.createElement('div'); row.className = 'post-row';
    const info = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = post.title;
    const meta = document.createElement('small'); meta.textContent = `${post.status === 'published' ? 'Published' : 'Draft'} · ${post.updatedAt.slice(0, 10)} · /blog/${post.slug}`;
    info.append(title, meta);
    const edit = document.createElement('button'); edit.type = 'button'; edit.textContent = 'Edit'; edit.onclick = () => { if (!busy && mayDiscard()) editPost(post); };
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Delete'; remove.className = 'danger';
    remove.onclick = async () => {
      if (busy || !confirm(`Permanently delete “${post.title}”? This cannot be undone.`)) return;
      busy = true; remove.disabled = true;
      try { await api(`/posts/${post.id}`, 'DELETE'); if (current?.id === post.id) { form.hidden = true; dirty = false; current = null; } await refresh(); notice('Article deleted.'); }
      catch (error) { notice(error.message, true); } finally { busy = false; remove.disabled = false; }
    };
    row.append(info, edit, remove); $('posts').append(row);
  }
}
const mayDiscard = () => !(dirty || smtpDirty) || confirm('Discard your unsaved changes?');
function seoPreview() {
  const title = field('seoTitle').value || field('title').value || 'Your article title';
  $('seo-title').textContent = title; $('seo-description').textContent = field('seoDescription').value || 'Your search description will appear here.';
  $('seo-url').textContent = `${location.host}/blog/${field('slug').value || 'your-article-slug'}`;
  $('title-count').textContent = `${field('seoTitle').value.length} / 70 characters`;
  $('description-count').textContent = `${field('seoDescription').value.length} / 170 characters`;
}
function updateFeaturedImagePreview() {
  const file = field('featuredImage').files[0];
  const url = file ? URL.createObjectURL(file) : field('cover').value.trim();
  const preview = $('featured-image-preview');
  const image = $('featured-image-preview-image');
  $('featured-image-status').textContent = file ? `${file.name} will be uploaded when you save.` : '';
  if (!url) {
    preview.hidden = true;
    image.removeAttribute('src');
    image.alt = '';
    return;
  }
  image.src = url;
  image.alt = field('coverAlt').value.trim() || 'Featured image preview';
  preview.hidden = false;
}
function editPost(post = null) {
  current = post; form.reset();
  for (const name of ['title', 'slug', 'excerpt', 'content', 'author', 'category', 'cover', 'coverAlt', 'seoTitle', 'seoDescription', 'status']) field(name).value = post?.[name] || (name === 'status' ? 'draft' : '');
  field('slug').readOnly = Boolean(post?.publishedAt);
  $('editor-title').textContent = post ? 'Edit article' : 'New article';
  $('preview').hidden = !post; $('preview').href = post ? `/admin/preview/${post.id}` : '#';
  $('view').hidden = post?.status !== 'published'; $('view').href = post ? `/blog/${post.slug}` : '#';
  articleEditor.setContents(articleEditor.clipboard.convert({ html: post?.renderedContent || '' }), 'silent');
  articleEditor.history.clear();
  dirty = false; form.hidden = false; seoPreview(); updateFeaturedImagePreview(); form.scrollIntoView({ behavior: 'smooth' }); field('title').focus();
}
form.addEventListener('input', () => { dirty = true; seoPreview(); });
field('cover').addEventListener('input', updateFeaturedImagePreview);
field('coverAlt').addEventListener('input', updateFeaturedImagePreview);
field('featuredImage').addEventListener('change', () => {
  const file = field('featuredImage').files[0];
  if (file && file.size > 8 * 1024 * 1024) {
    field('featuredImage').value = '';
    $('featured-image-status').textContent = 'Image must be 8 MB or smaller.';
    notice('Image must be 8 MB or smaller.', true);
  }
  dirty = true;
  updateFeaturedImagePreview();
});
$('remove-featured-image').onclick = () => {
  field('featuredImage').value = '';
  field('cover').value = '';
  field('coverAlt').value = '';
  dirty = true;
  updateFeaturedImagePreview();
  field('cover').focus();
};
field('title').addEventListener('blur', () => { if (!field('slug').value) { field('slug').value = field('title').value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100).replace(/-$/, ''); seoPreview(); } });
$('new').onclick = () => { if (!busy && mayDiscard()) editPost(); };
$('close').onclick = () => { if (!busy && mayDiscard()) { form.hidden = true; dirty = false; } };
form.onsubmit = async event => {
  event.preventDefault(); if (busy) return;
  if (!articleEditor.getText().trim()) { notice('Article content is required.', true); articleEditor.focus(); return; }
  field('content').value = articleEditor.getSemanticHTML();
  if (field('content').value.length > 100000) { notice('Article is too long. Please shorten it before saving.', true); return; }
  const imageFile = field('featuredImage').files[0];
  if (imageFile) {
    const upload = new FormData(); upload.append('image', imageFile);
    try {
      const response = await fetch('/api/blog/upload', { method: 'POST', headers: { 'X-CSRF-Token': csrf }, body: upload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Image upload failed.');
      field('cover').value = result.url;
    } catch (error) { notice(error.message, true); return; }
  }
  const data = Object.fromEntries(new FormData(form));
  delete data.featuredImage;
  if (current) data.updatedAt = current.updatedAt;
  if (data.status === 'published' && current?.status !== 'published' && !confirm('Publish this article? It will become visible to everyone.')) return;
  busy = true; $('save').disabled = true;
  try { const saved = await api(current ? `/posts/${current.id}` : '/posts', current ? 'PUT' : 'POST', data); editPost(saved); await refresh(); notice(saved.status === 'published' ? 'Article published. The sitemap is updated automatically.' : 'Draft saved. It is only visible in the admin preview.'); }
  catch (error) { notice(error.message, true); }
  finally { busy = false; $('save').disabled = false; }
};
$('login').onsubmit = async event => {
  event.preventDefault(); const button = $('login').querySelector('button'); button.disabled = true;
  try { const data = await api('/login', 'POST', { identifier: $('login').elements.identifier.value, password: $('login').elements.password.value }); csrf = data.csrf; currentUser = data.user; $('login').reset(); await refresh(); showWorkspace(true); notice('Signed in.'); }
  catch (error) { notice(error.message, true); } finally { button.disabled = false; }
};
$('logout').onclick = async () => { if (busy || !mayDiscard()) return; try { await api('/logout', 'POST'); csrf = ''; dirty = false; form.reset(); form.hidden = true; posts = []; $('posts').replaceChildren(); showWorkspace(false); notice('Signed out.'); } catch (error) { notice(error.message, true); } };
window.addEventListener('beforeunload', event => { if (dirty || smtpDirty) { event.preventDefault(); event.returnValue = ''; } });
const smtpForm = $('smtp-form');
const smtpField = name => smtpForm.elements.namedItem(name);
function smtpNotice(message, error = false) { $('smtp-status').textContent = message; $('smtp-status').className = error ? 'error' : 'success'; }
function populateSmtp(settings) {
  for (const name of ['host', 'port', 'username', 'from']) smtpField(name).value = settings[name];
  smtpField('password').value = '';
  smtpField('password').required = !settings.hasPassword;
  $('smtp-password-help').textContent = settings.hasPassword ? 'Password saved. Leave blank to keep it; enter a new password to replace it.' : 'Enter your SMTP password or app password.';
  $('smtp-source').textContent = settings.configured ? `Using ${settings.source === 'admin' ? 'saved admin settings' : 'server environment settings'}. Changes apply immediately after saving.` : 'Email is not configured yet. Add your sending account below.';
  smtpVersion = settings.version; smtpDirty = false;
}
async function loadSmtp() {
  $('smtp-fields').disabled = true; $('smtp-reload').hidden = true;
  try { const settings = await api('/smtp'); populateSmtp(settings); $('smtp-fields').disabled = false; }
  catch (error) { smtpNotice(error.message, true); $('smtp-reload').hidden = false; }
}
smtpForm.addEventListener('input', () => { smtpDirty = true; });
$('smtp-reload').onclick = () => { if (!busy && (!smtpDirty || confirm('Discard unsaved SMTP changes?'))) void loadSmtp(); };
smtpForm.onsubmit = async event => {
  event.preventDefault(); if (busy) return;
  const data = { ...Object.fromEntries(new FormData(smtpForm)), version: smtpVersion };
  busy = true; $('smtp-fields').disabled = true;
  try { populateSmtp(await api('/smtp', 'PUT', data)); smtpNotice('SMTP settings saved. Partner enquiries will use these settings immediately.'); $('smtp-reload').hidden = true; }
  catch (error) { smtpNotice(error.message, true); $('smtp-reload').hidden = false; }
  finally { busy = false; $('smtp-fields').disabled = false; }
};
$('smtp-verify').onclick = async () => {
  if (busy) return;
  if (smtpDirty) { smtpNotice('Save your changes before checking the connection.', true); return; }
  busy = true; $('smtp-fields').disabled = true; smtpNotice('Checking the saved SMTP connection…');
  try { const result = await api('/smtp/verify', 'POST', { version: smtpVersion }); smtpNotice(result.message); }
  catch (error) { smtpNotice(error.message, true); }
  finally { busy = false; $('smtp-fields').disabled = false; }
};
const accountControls = setupAccounts(api, () => { csrf = ''; currentUser = null; dirty = false; smtpDirty = false; form.reset(); form.hidden = true; $('posts').replaceChildren(); showWorkspace(false); notice('Password changed. Please sign in again.'); });
try { const auth = await api('/session'); csrf = auth.csrf; currentUser = auth.user; await refresh(); showWorkspace(true); } catch { showWorkspace(false); }
