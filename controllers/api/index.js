// Import necessary modules and routes
const router = require('express').Router();
const guestRoute = require('./guestRoute'); // Import guest routes
const userRoute = require('./userRoute');   // Import user routes
const postRoute = require('./postRoute');   // Import post routes

// Use the userRoute for routes starting with '/users'
router.use('/users', userRoute);

// Use the postRoute for routes starting with '/posts'
router.use('/posts', postRoute);

// Use the guestRoute for routes starting with '/guest'
router.use('/guest', guestRoute);

// Export the main router for use in other parts of the application
module.exports = router;
