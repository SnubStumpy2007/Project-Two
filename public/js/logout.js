// Define an asynchronous function called 'logout'
const logout = async () => {
    // Send a POST request to the '/api/users/logout' endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If response is successful, redirect to the home page ('/'), else show an alert
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
};

// Attach the 'logout' function to the click event of an element with the ID 'logout'
document.querySelector('#logout').addEventListener('click', logout);
