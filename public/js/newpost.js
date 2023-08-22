function createNewPost() {
  const title = prompt("Enter the title for the new blog post:");
  const content = prompt("Enter the content for the new blog post:");

  if (title && content) {
      const newPost = { title, content };
      blogPosts.push(newPost);
      displayBlogPosts();
  } else {
      alert("Both title and content are required.");
  }
}


const newPostButton = document.getElementById("newPostButton");
