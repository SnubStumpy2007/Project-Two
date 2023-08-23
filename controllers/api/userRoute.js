// Import necessary modules and models
const router = require('express').Router();
const { UserAccount, Post } = require('../../models');

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted email address
    const user = await UserAccount.findOne({ where: { Email: req.body.Email } });

    if (!user) {
      // If no user is found, return an error message
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password stored in the database
    const validPassword = await user.checkPassword(req.body.Password);

    if (!validPassword) {
      // If the password is incorrect, return an error message
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged-in user
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handle errors by sending a JSON response with an error message
    res.status(400).json(err);
  }
});

// Route to handle user search
router.get('/search', async (req, res) => {
  const userSearch = req.query.homeSearch;

  try {
    // Find and return search results in a JSON response
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
    // Handle errors by sending a JSON response with an error message
    res.status(500).json({ message: 'Could Not Find Results' });
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables to log out the user
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, return a 404 error
    res.status(404).end();
  }
});

// Export the router for use in other parts of the application
module.exports = router;
