const router = require('express').Router();
const { UserAccount , Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Join Posts with User Accounts
    const userPosts = await Post.findAll({
      include: [
        {
          model: UserAccount,
          attributes: ['UserName'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = userPosts.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('profile', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const blogContent = await Post.findByPk(req.params.id, {
      include: [
        {
          model: UserAccount,
          attributes: ['UserName'],
        },
      ],
    });

    const blogPost = {
      UserName: blogContent.user_name,
      Title: blogContent.title,
      VenueName: blogContent.venue_name,
      EventDate: blogContent.event_date,
      Genre: blogContent.genre,
      DatePosted: blogContent.created_at,
      PostText: blogContent.post_text
    };

    res.render('post', {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await UserAccount.findByPk(req.session.user_id, {
      attributes: { exclude: ['Password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('/profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;