const router = require('express').Router();
const { UserAccount, Post } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt with Email:', req.body.Email);

        // Find the user who matches the posted e-mail address
        const user = await UserAccount.findOne({ where: { Email: req.body.Email } });

        if (!user) {
            console.log('User not found with Email:', req.body.Email);
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        console.log('User found. Verifying password.');

        // Verify the posted password with the password stored in the database
        const validPassword = await user.checkPassword(req.body.Password);  // Please confirm that `checkPassword` is the right method name for your setup

        if (!validPassword) {
            console.log('Password verification failed for Email:', req.body.Email);
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        console.log('Password verified. Creating session.');

        // Create session variables based on the logged-in user
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

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
