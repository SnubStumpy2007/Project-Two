// Middleware function for checking user authentication
const withAuth = (req, res, next) => {
  // Check if the user is not logged in (based on the 'logged_in' property in the session)
  if (!req.session.logged_in) {
    // If not logged in, redirect to the login page
    res.redirect('/login');
  } else {
    // If logged in, proceed to the next middleware or route handler
    next();
  }
};

// Export the 'withAuth' middleware for use in other parts of the application
module.exports = withAuth;