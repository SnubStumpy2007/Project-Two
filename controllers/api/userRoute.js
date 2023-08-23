// Import necessary modules and models
const router = require('express').Router();
const { UserAccount, Post } = require('../../models');

// Route to render the registration form
router.get('/register', (req, res) => {
  res.render('register'); // Render the registration view
});

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
      // Extract user registration data from the request body
      const { user_name, first_name, last_name, email, pwd_hash } = req.body;

      // Hash the password using bcrypt with a salt factor of 10
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

      // Log a success message and redirect to the login page
      console.log("User registration successful. Redirecting to login...");
      res.redirect('/auth/login');
  } catch (error) {
      // Handle registration errors and send an error response
      console.error("Registration error:", error);
      res.status(500).send(`Registration error: ${error.message}`);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
      // Find a user with the provided username
      const user = await UserAccount.findOne({ where: { UserName: req.body.user_name } });

      // Check if the user exists and the provided password matches the hashed password
      if (user && await bcrypt.compare(req.body.pwd_hash, user.Password)) {
          // Store the user's ID in the session for tracking their login status
          req.session.userId = user.id;

          // Redirect to the home page or another appropriate destination
          res.redirect('/');
      } else {
          // If login fails, render the login page with an error message
          res.render('login', { error: 'Invalid username or password' });
      }

    // Create session variables based on the logged-in user
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: user, message: 'You are now logged in!' });
    });

    // Handle login errors and send an error response
  } catch (err) {
    console.error("Login error:", error);
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
