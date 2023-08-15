// Define an asynchronous function that handles login form submission
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the '/api/users/login' endpoint with login data
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If response is successful, redirect to '/profile', else show an alert
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
};
  
// Define an asynchronous function that handles signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      // Send a POST request to the '/api/users' endpoint with signup data
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If response is successful, redirect to '/profile', else show an alert
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
};
  
// Attach the 'loginFormHandler' function to the login form's 'submit' event
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
// Attach the 'signupFormHandler' function to the signup form's 'submit' event
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
