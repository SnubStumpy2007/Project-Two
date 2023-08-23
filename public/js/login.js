const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#user_name').value.trim();
  const password = document.querySelector('#pwd_hash').value.trim();

  if (userName && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ user_name: userName, pwd_hash: password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert('Failed to log in. Please check your credentials and try again.');
      }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
