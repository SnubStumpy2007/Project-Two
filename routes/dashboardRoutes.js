const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { UserAccount, Post } = require('../models');

// Use the "withAuth" middleware to protect the dashboard route.
router.get('/', withAuth, (req, res) => {
    // Fetch data or perform actions specific to the dashboard and render the dashboard view.
    res.render('profile');
});

router.get('/post', withAuth, (req, res) =>{
    
})

module.exports = router;