const router = require('express').Router();
const postRoute = require('./postRoute');
const guestRoute = require('./guestRoute');
const userRoute = require('./userRoute');



// User routes
router.use('/users', userRoute);

// Post routes
router.use('/posts', postRoute);

// Guest routes
router.use('/guest', guestRoute);

module.exports = router;
