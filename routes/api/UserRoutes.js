const router = require('express').Router();
const bcrypt = require('bcrypt');
const { userAccount } = require('../../models/userAccount');

// Registration route
router.post('/api/register', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await UserAccount.create({
      UserName: req.body.username,
      Email: req.body.email,
      Password: hashedPassword
      // Other fields can be added as needed
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
// Uncomment this if you'd like to use it.
/*
router.post('/api/login', async (req, res) => {
    const user = await UserAccount.findOne({ where: { UserName: req.body.username } });
    if (!user) {
        return res.status(400).json({ message: 'No such user found' });
    }

    const isValid = await bcrypt.compare(req.body.password, user.Password);
    if (!isValid) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    req.session.user = user.dataValues;
    res.redirect('/index.html');
});
*/

module.exports = router;
