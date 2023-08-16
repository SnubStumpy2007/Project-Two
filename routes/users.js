// routes/users.js
const express = require('express');
const path = require('path');
const { User } = require('../models');

const router = express.Router();

// Route to show registration form
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const user = await User.create({
            user_name: req.body.username,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            pwd_hash: req.body.password
        });

        req.session.userId = user.id;
        console.log("User registration successful. Redirecting to login.html...");
        res.redirect('/login.html');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send(`Registration error: ${error.message}`);
    }
});

// Route to show login form
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_name: req.body.username } });

        if (user && user.checkPassword(req.body.password)) {
            req.session.userId = user.id;
            res.redirect('/index.html');  
        } else {
            res.redirect('/login.html');
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send(`Login error: ${error.message}`);
    }
});

// Other routes ...
router.get('/explore', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, '../public/explore.html'));
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login.html');
    }
    res.send("Welcome to the dashboard!");
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            res.status(500).send(`Logout error: ${err.message}`);
        } else {
            res.redirect('/login.html');
        }
    });
});

module.exports = router;
