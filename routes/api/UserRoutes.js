const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserAccount = require('../../models/userAccount');

// Registration route
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
            // Other fields can be added as needed
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login route
router.post('/api/login', async (req, res) => {
    const user = await UserAccount.findOne({ where: { user_name: req.body.username } });
    if (!user) {
        return res.status(400).json({ message: 'No such user found' });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    req.session.user = user.dataValues;
    res.redirect('/index.html');
});

module.exports = router;
