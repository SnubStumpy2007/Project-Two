const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { UserAccount } = require('../models');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { user_name, first_name, last_name, email, pwd_hash } = req.body;

        // Checking for the presence of required fields
        if (!user_name || !first_name || !pwd_hash) {
            return res.status(400).send('Required fields are missing');
        }

        // Check if user already exists with the same username or email
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

        const hashedPassword = await bcrypt.hash(pwd_hash, 10);

        const user = await UserAccount.create({
            UserName: user_name, 
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: hashedPassword
        });

        req.session.userId = user.id;
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed. Please try again.');
    }
});

module.exports = router;
