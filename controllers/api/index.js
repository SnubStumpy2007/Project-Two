const router = require('express').Router();
const guestRoute = require('./guestRoute');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/guest', guestRoute);

module.exports = router;
