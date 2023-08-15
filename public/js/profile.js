// Define an asynchronous function that handles form submission for creating a new project
const newFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Collect values from the new project form
    const name = document.querySelector('#project-name').value.trim();
    const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    // Check if input values are not empty
    if (name && needed_funding && description) {
      // Send a POST request to the '/api/projects' endpoint with project data
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // If response is successful, redirect to '/profile', else show an alert
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
};

// Define an asynchronous function that handles delete button clicks for projects
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      // Send a DELETE request to the `/api/projects/${id}` endpoint
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      // If response is successful, redirect to '/profile', else show an alert
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
};

// Attach the 'newFormHandler' function to the new project form's 'submit' event
document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);

// Attach the 'delButtonHandler' function to the click event of elements with class 'project-list'
document.querySelector('.project-list').addEventListener('click', delButtonHandler);
