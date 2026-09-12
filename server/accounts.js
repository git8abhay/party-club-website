export function setupAccounts(api, signedOut) {
  const $ = id => document.getElementById(id);
  const form = $('user-form'), passwordForm = $('password-form');
  const field = name => form.elements.namedItem(name);
  let me = null, editing = null, busy = false, dirty = false;
  const status = (id, text, error = false) => { $(id).textContent = text; $(id).className = error ? 'error' : 'success'; };
  async function refresh() {
    const users = await api('/users');
    if (me?.role !== 'admin') return;
    $('users-list').replaceChildren();
    for (const user of users) {
      const row = document.createElement('div'); row.className = 'post-row';
      const info = document.createElement('div'), title = document.createElement('strong'), detail = document.createElement('small');
      title.textContent = user.name; detail.textContent = `${user.username} · ${user.email} · ${user.role} · ${user.active ? 'Active' : 'Disabled'}`;
      info.append(title, detail);
      const edit = document.createElement('button'); edit.type = 'button'; edit.textContent = 'Edit account'; edit.onclick = () => { if (!busy && discard()) open(user); };
      row.append(info, edit); $('users-list').append(row);
    }
  }
  const discard = () => !dirty || confirm('Discard unsaved account changes?');
  function open(user = null) {
    editing = user; form.reset();
    for (const name of ['name', 'username', 'email', 'role']) field(name).value = user?.[name] || (name === 'role' ? 'editor' : '');
    field('active').value = String(user?.active ?? true);
    field('password').required = !user;
    field('role').disabled = user?.id === me.id; field('active').disabled = user?.id === me.id;
    $('user-form-title').textContent = user ? 'Edit account' : 'Add account';
    form.hidden = false; dirty = false; field('name').focus();
  }
  form.addEventListener('input', () => { dirty = true; });
  window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  $('new-user').onclick = () => { if (!busy && discard()) open(); };
  $('cancel-user').onclick = () => { if (!busy && discard()) { form.reset(); form.hidden = true; dirty = false; } };
  $('reload-users').onclick = async () => { if (busy) return; try { await refresh(); } catch (error) { status('users-status', error.message, true); } };
  form.onsubmit = async event => {
    event.preventDefault(); if (busy) return;
    const data = Object.fromEntries(new FormData(form));
    data.role = field('role').value; data.active = field('active').value === 'true';
    if (editing) data.version = editing.version;
    const ownReset = editing?.id === me.id && Boolean(data.password);
    busy = true; const button = form.querySelector('button[type="submit"]'); button.disabled = true;
    try {
      await api(editing ? `/users/${editing.id}` : '/users', editing ? 'PUT' : 'POST', data);
      dirty = false; form.reset(); form.hidden = true;
      if (ownReset) { signedOut(); return; }
      await refresh(); status('users-status', 'Account saved. Password resets, role changes and disabling an account sign that person out.');
    } catch (error) { status('users-status', error.message, true); }
    finally { busy = false; button.disabled = false; }
  };
  passwordForm.onsubmit = async event => {
    event.preventDefault(); if (busy) return;
    const data = Object.fromEntries(new FormData(passwordForm));
    if (data.newPassword !== data.confirmPassword) { status('password-status', 'New passwords do not match.', true); return; }
    busy = true; const button = passwordForm.querySelector('button'); button.disabled = true;
    try { await api('/password', 'POST', data); passwordForm.reset(); signedOut(); }
    catch (error) { status('password-status', error.message, true); }
    finally { busy = false; button.disabled = false; }
  };
  return { show(user) {
    me = user; $('users-panel').hidden = user?.role !== 'admin';
    $('signed-in-user').textContent = user ? `Signed in as ${user.name} (${user.username}) · ${user.role === 'admin' ? 'Administrator' : 'Editor'}` : '';
    if (!user) { dirty = false; form.reset(); passwordForm.reset(); form.hidden = true; $('users-list').replaceChildren(); $('users-panel').open = false; $('my-account').open = false; $('password-status').textContent = ''; $('users-status').textContent = ''; }
    else if (user.role === 'admin') refresh().catch(error => status('users-status', error.message, true));
  } };
}
