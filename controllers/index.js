// Import necessary modules and define the main router
const router = require('express').Router();

// Import API and home routes
const apiRoutes = require('./api');       // Routes for API endpoints
const homeRoutes = require('./homeRoutes'); // Routes for home and web pages

// Use the homeRoutes for routes starting with '/'
router.use('/', homeRoutes);

// Use the apiRoutes for routes starting with '/api'
router.use('/api', apiRoutes);

// Export the main router for use in other parts of the application
module.exports = router;
