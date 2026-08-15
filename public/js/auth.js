// auth.js - handle login/register forms
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const messageDiv = document.getElementById('message');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const data = await login(email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/';
      } catch (error) {
        showMessage(error.message, 'danger');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const data = await register(name, email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/';
      } catch (error) {
        showMessage(error.message, 'danger');
      }
    });
  }

  function showMessage(msg, type) {
    if (messageDiv) {
      messageDiv.textContent = msg;
      messageDiv.className = `alert ${type === 'danger' ? 'alert' : 'alert-success'}`;
      messageDiv.classList.remove('hidden');
      setTimeout(() => {
        messageDiv.classList.add('hidden');
      }, 5000);
    }
  }
});
