const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { UserAccount, Post } = require('../models');

// Route to display the user's profile page (requires authentication)
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged-in user based on the session ID
      const userData = await UserAccount.findByPk(req.session.user_id, {
        attributes: { exclude: ['Password'] },
        include: [{ model: UserAccount }],
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

// Route to display the logged in user posts (requires authentication)
router.get('/', async (req, res) => {
    try {
      // Fetch user posts and include associated user information
      const userPosts = await Post.findAll({
        include: [
          {
            model: [{ model: UserAccount }],
            attributes: ['UserName'],
          },
          {
            model: [{ model: Post }],
            attributes: { exclude: ['PostText']},
          }
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

module.exports = router;