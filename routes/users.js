const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      aboutMe: req.body.aboutMe,
      password: hashedPassword
    });
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.userId = user.id;
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

module.exports = router;
