const express = require('express');
const bcrypt = require('bcrypt');
const { UserAccount, Post } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { authenticateUser } = require('../../config/middleware/auth');
const router = express.Router();

// Existing login route from controllers/api/userRoute.js
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt with Email:', req.body.Email);
        const user = await UserAccount.findOne({ where: { Email: req.body.Email } });

        if (!user) {
            console.log('User not found with Email:', req.body.Email);
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        console.log('User found. Verifying password.');
        const validPassword = await user.checkPassword(req.body.Password);

        if (!validPassword) {
            console.log('Password verification failed for Email:', req.body.Email);
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        console.log('Password verified. Creating session.');
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            console.log('Session saved for User ID:', user.id);
            res.json({ user: user, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error('Error occurred during login:', err);
        res.status(400).json(err);
    }
});

// Existing search route from controllers/api/userRoute.js
router.get('/search', async (req, res) => {
    const userSearch = req.query.homeSearch;
    try {
        const displayResults = await Post.findAll({
            where: {
                [Op.or]: [
                    { Title: { [Op.iLike]: userSearch } },
                    { VenueName: { [Op.iLike]: userSearch } },
                    { Genre: { [Op.iLike]: userSearch } },
                    { EventDate: { [Op.iLike]: userSearch } },
                    { UserName: { [Op.iLike]: userSearch } },
                    { created_on: { [Op.iLike]: userSearch } }
                ],
            },
        });
        res.status(200).json(displayResults);
    } catch (err) {
        console.error('Error occurred during search:', err);
        res.status(500).json({ message: 'Could Not Find Results' });
    }
});

// Existing logout route from controllers/api/userRoute.js
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Adding unique routes from routes/api/UserRoutes.js

router.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await UserAccount.create({
            user_name: username,
            email: email,
            password: hashedPassword
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Adding unique routes from routes/users.js

router.get('/register', (req, res) => {
    console.log('Accessing Register GET endpoint');
    res.render('register');
});

router.get('/login', (req, res) => {
    console.log('Accessing Login GET endpoint');
    res.render('login');
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
