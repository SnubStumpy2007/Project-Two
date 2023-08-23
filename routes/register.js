// Import necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { UserAccount } = require('../models');
const { Op } = require('sequelize'); // Import Sequelize's Op object for complex queries

// Route to render the registration form
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration view
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const { user_name, first_name, last_name, email, pwd_hash } = req.body;

        // Checking for the presence of required fields
        if (!user_name || !first_name || !pwd_hash) {
            return res.status(400).send('Required fields are missing');
        }

        // Check if a user already exists with the same username or email
        const existingUser = await UserAccount.findOne({ 
            where: { 
                [Op.or]: [
                    { UserName: user_name }, 
                    { Email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).send('User with this username or email already exists');
        }

        // Hash the provided password using bcrypt with a salt factor of 10
        const hashedPassword = await bcrypt.hash(pwd_hash, 10);

        // Create a new user account in the database
        const user = await UserAccount.create({
            UserName: user_name, 
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: hashedPassword
        });

        // Store the user's ID in the session for tracking their login status
        req.session.userId = user.id;

        // Redirect to the login page upon successful registration
        res.redirect('/auth/login');
    } catch (error) {
        // Handle registration errors and send an error response
        console.error(error);
        res.status(500).send('Registration failed. Please try again.');
    }
});

// Export the router for use in other parts of the application
module.exports = router;