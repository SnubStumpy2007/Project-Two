// Import necessary modules and middleware
const router = require('express').Router();
const { UserAccount, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to display the homepage with user posts
router.get('/', async (req, res) => {
  try {
    // Fetch user posts and include associated user information
    const userPosts = await Post.findAll({
      include: [
        {
          model: UserAccount,
          attributes: ['UserName'],
        },
      ],
    });

    // Serialize data to make it accessible in the template
    const blogPosts = userPosts.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into the template
    res.render('profile', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a specific blog post
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a specific blog post and include associated user information
    const blogContent = await Post.findByPk(req.params.id, {
      include: [
        {
          model: UserAccount,
          attributes: ['UserName'],
        },
      ],
    });

    // Create a structured object for the blog post data
    const blogPost = {
      UserName: blogContent.user_name,
      Title: blogContent.title,
      VenueName: blogContent.venue_name,
      EventDate: blogContent.event_date,
      Genre: blogContent.genre,
      DatePosted: blogContent.created_at,
      PostText: blogContent.post_text,
    };

    // Pass the structured blog post data and session flag into the template
    res.render('post', {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display the user's profile page (requires authentication)
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await UserAccount.findByPk(req.session.user_id, {
      attributes: { exclude: ['Password'] },
      include: [{ model: Post }],
    });

    // Serialize the user data
    const user = userData.get({ plain: true });

    // Pass the serialized user data and session flag into the template
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to another route (e.g., profile)
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login'); // Render the login view
});

// Export the router for use in other parts of the application
module.exports = router;
