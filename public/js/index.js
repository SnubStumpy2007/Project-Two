// Get references to HTML elements
const searchForm = document.getElementById('homeSearch');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

// Add event listener to the search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    searchPosts (searchQuery);
  });
  
  // Function to search books based on the given query
  function searchPosts(query) {
    // Clear previous search results
    resultsContainer.innerHTML = '';
  
    // Send a request to the server using the query
    fetch()
      .then((response) => response.json())
      .then((data) => {
        // Process the server response and display the results
        data.items.forEach((post) => {
          const postPreview = createPreview(post);
          resultsContainer.appendChild(postPreview);
        });
        var resultsSection = document.getElementById("results-section");
        resultsSection.style.display = "block";
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
  
  function createpostPreview(post) {
    const postPreview = document.createElement('div');
    postPreview.classList.add('box');
    postPreview.classList.add('has-background-dark');
    postPreview.style.color = 'white'; // Set text color to white
  
    const title = document.createElement('h3');
    title.textContent = post_id.Title;
    postPreview.appendChild(title);
  
    const author = document.createElement('p');
    author.textContent = post_id.UserName;
    bookCard.appendChild(author);
  
    //need to add a click event for search results to display full post
  
    // Apply consistent styling to the preview
    postPreview.style.display = 'flex';
    postPreview.style.flexDirection = 'column';
    postPreview.style.textAlign = 'left';
  
    title.style.marginTop = '10px';
    author.style.marginTop = '5px';
  
    return postPreview;
  }
  