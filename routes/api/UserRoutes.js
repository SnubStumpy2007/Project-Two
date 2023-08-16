const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// Existing registration route
router.post('/register', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
/*router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
        return res.status(400).json({ message: 'No such user found' });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    req.session.user = user.dataValues;
    // res.json({ user: user, message: 'You are now logged in!' });
    // If you want to redirect to index.html after successful login, you can use:
     res.redirect('/index.html');
});
*/
module.exports = router;
