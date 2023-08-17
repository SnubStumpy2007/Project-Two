const express = require('express');
const { userAccount } = require('../models');
const router = express.Router();

// Route to show registration form
router.get('/register', ( res ) => {
    res.render('register'); 
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const user = await userAccount.create({
            user_name: req.body.username,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            pwd_hash: req.body.password 
        });
        
        req.session.userId = user.id;
        console.log("User registration successful. Redirecting to login...");
        res.redirect('/login'); 
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send(`Registration error: ${error.message}`);
    }
});

// Route to show login form
router.get('/login', ( res ) => {
    res.render('login'); 
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const user = await userAccount.findOne({ where: { user_name: req.body.user_name } });
        
        if (user && userAccount.checkPassword(req.body.password)) {
            req.session.userId = user.id;
            res.redirect('/');  
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send(`Login error: ${error.message}`);
    }
});

module.exports = router;
