const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path'); 
const { User } = require('../models');

const router = express.Router();

// Route to serve the static register.html page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../path-to-your-html-folder/register.html')); // Adjust the path accordingly
});

// Registration route for handling form submission from register.html
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
        res.redirect('/users/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/users/register'); 
    }
});

// Route to serve the static login.html page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../path-to-your-html-folder/login.html')); 
});

// Login route for handling form submission from login.html
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/users/dashboard'); 
        } else {
            res.redirect('/users/login'); 
        }
    } catch (error) {
        console.error(error);
        res.redirect('/users/login');
    }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
    // Here you'd normally render a Handlebars view or another templating system.
    // For simplicity, I'll just send a message.
    res.send("Welcome to the dashboard!");
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/users/login');
    });
});

module.exports = router;
