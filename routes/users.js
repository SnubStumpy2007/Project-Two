const express = require('express');
const bcrypt = require('bcrypt');
const { UserAccount } = require('../models');
const { authenticateUser } = require('../config/middleware/auth'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

console.log("Imported UserAccount:", UserAccount);

router.get('/register', (req, res) => {
    console.log('Accessing Register GET endpoint');
    res.render('register');
});

router.post('/register', async (req, res) => {
    console.log('Attempting Registration');
    console.log(req.body);

    try {
        const { user_name, first_name, last_name, email, pwd_hash } = req.body;

        if (!user_name || !first_name || !pwd_hash) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const existingUser = await UserAccount.findOne({ 
            where: { 
                [Op.or]: [
                    { user_name: user_name }, 
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(pwd_hash, 10);

        const user = await UserAccount.create({
            user_name: user_name, 
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        });

        req.session.userId = user.id;
        console.log("User registration successful. Redirecting to login...");
        res.redirect('/auth/login');

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

router.get('/login', (req, res) => {
    console.log('Accessing Login GET endpoint');
    res.render('login'); 
});

router.post('/login', async (req, res) => {
    console.log('Attempting Login');
    const { user_name, pwd_hash } = req.body;

    if (!user_name || !pwd_hash) {
        console.error("Login error: Missing username or password");
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    try {
        const user = await UserAccount.findOne({
            where: { user_name: user_name }
        });

        if (!user) {
            console.error("Login error: User not found");
            return res.status(400).json({ error: 'No user found with this username' });
        }

        const isValidPassword = await user.checkPassword(pwd_hash);
        console.log(`Checking password for user: ${user_name}. IsValid: ${isValidPassword}`);

        if (!isValidPassword) {
            console.error("Login error: Incorrect password");
            return res.status(400).json({ error: 'Incorrect password' });
        }

        req.session.userId = user.id;
        console.log("User login successful. Redirecting to explore...");
        res.redirect('/auth/explore');

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

router.get('/explore', authenticateUser, (req, res) => {
    console.log('Inside explore route. Rendering explore page.');
    res.render('explore');
});

router.get('/all-users', async (req, res) => {
    console.log('Fetching all users');
    try {
        const users = await UserAccount.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: `Error fetching all users: ${error.message}` });
    }
});

module.exports = router;
