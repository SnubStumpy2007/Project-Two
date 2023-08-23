// Import necessary modules and middleware
const router = require('express').Router();
const { Post, UserAccount } = require('../../models'); // Import your models
const withAuth = require('../../utils/auth'); // Import authentication middleware

// Route to create a new post (requires authentication)
router.post('/', withAuth, async (req, res) =>{ 
  try {
    // Create a new post with the data from the request body and the user's session ID
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send a JSON response with the newly created post
    res.status(200).json(newPost);
  } catch (err) {
    // Handle errors by sending a JSON response with an error message
    res.status(400).json(err);
  }
});

// Route to update a post (requires authentication)
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the post to update by its ID and user ID
    const postToUpdate = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postToUpdate) {
      // Handle the case where the post was not found
      res.status(404).json({ message: 'Post not found or unauthorized to update' });
      return;
    }

    // Update the post with the data from the request body
    await postToUpdate.update(req.body);

    // Send a JSON response indicating successful update
    res.status(200).json(postToUpdate);
  } catch (err) {
    // Handle errors by sending a JSON response with an error message
    res.status(500).json(err);
  }
});

// Route to delete a post (requires authentication)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a post based on the provided ID and the user's session ID
    const blogPost = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

    if (!blogPost) {
      // Handle the case where the post was not found
      res.status(404).json({ message: 'You have not created any posts yet!' });
      return;
    }

    // Send a JSON response indicating successful deletion
    res.status(200).json(blogPost);
  } catch (err) {
    // Handle errors by sending a JSON response with an error message
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;