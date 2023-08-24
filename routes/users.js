// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const { userAccount } = require('../models');

// Create an instance of an Express router
const router = express.Router();

// Route to render the registration form
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration view
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        // Extract user registration data from the request body
        const { user_name, first_name, last_name, email, pwd_hash } = req.body;

        // Hash the password using bcrypt with a salt factor of 10
        const hashedPassword = await bcrypt.hash(pwd_hash, 10);

        // Create a new user account in the database
        const user = await userAccount.create({
            UserName: user_name,
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: hashedPassword
        });

        // Store the user's ID in the session for tracking their login status
        req.session.userId = user.id;

        // Log a success message and redirect to the login page
        console.log("User registration successful. Redirecting to login...");
        res.redirect('/auth/login');
    } catch (error) {
        // Handle registration errors and send an error response
        console.error("Registration error:", error);
        res.status(500).send(`Registration error: ${error.message}`);
    }
});

// Route to render the login form
router.get('/login', (req, res) => {
    res.render('login'); // Render the login view
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        // Find a user with the provided username
        const user = await userAccount.findOne({ where: { UserName: req.body.user_name } });

        // Check if the user exists and the provided password matches the hashed password
        if (user && await bcrypt.compare(req.body.pwd_hash, user.Password)) {
            // Store the user's ID in the session for tracking their login status
            req.session.userId = user.id;

            // Redirect to the home page or another appropriate destination
            res.redirect('/');
        } else {
            // If login fails, render the login page with an error message
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        // Handle login errors and send an error response
        console.error("Login error:", error);
        res.status(500).send(`Login error: ${error.message}`);
    }
});

// Export the router for use in other parts of the application
module.exports = router;
