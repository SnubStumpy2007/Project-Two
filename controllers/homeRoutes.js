const router = require('express').Router();
const { User , Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Join Posts with User Accounts
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
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
          model: User,
          attributes: ['UserName'],
        },
      ],
    });

    const blogPost = blogContent.get({ plain: true });

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
    const userAccount = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['Password'] },
      include: [{ model: Project }],
    });

    const user = userAccount.get({ plain: true });

    res.render('profile', {
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