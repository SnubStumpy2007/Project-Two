//pull user data for profile page
const source = document.getElementById("profile-info").innerHTML;
const template = Handlebars.compile(source);

// Sample data for the template
const context = {
    user_name: UserAccount.user_name,
    first_name: UserAccount.first_name,
    last_name: UserAccount.last_name,
    email: UserAccount.email
};

// Render the template with the data
const renderedHtml = template(context);

// Insert the rendered HTML into the DOM
const profileContainer = document.getElementById("profile");
profileContainer.innerHTML = renderedHtml;


// Define an asynchronous function that handles form submission for creating a new project
const newFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Collect values from the new post form
    const title = document.querySelector('#Title').value.trim();
    const venue_name = document.querySelector('#VenueName').value.trim();
    const event_date = document.querySelector('#EventDate').value.trim();
    const genre = document.querySelector('#Genre').value.trim();
    const post_text = document.querySelector('#PostText').value.trim();
  
    // Check if input values are not empty
    if (title && venue_name && event_date && genre && post_text) {
      // Send a POST request to the '/api/postRoute' endpoint with project data
      const response = await fetch(`/api/postRoute`, {
        method: 'POST',
        body: JSON.stringify({ title, venue_name, event_date, genre, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // If response is successful, redirect to '/profile', else show an alert
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
};

// Define an asynchronous function that handles delete button clicks for projects
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('post-id')) {
      const id = event.target.getAttribute('post-id');
  
      // Send a DELETE request to the `/api/postRoute/${id}` endpoint
      const response = await fetch(`/api/postRoute/${id}`, {
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
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

// Attach the 'delButtonHandler' function to the click event of elements with class 'project-list'
document.querySelector('.post-list').addEventListener('click', delButtonHandler);
