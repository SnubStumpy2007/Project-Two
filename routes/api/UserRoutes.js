const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

router.post('/', async (req, res) => {
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

module.exports = router;
