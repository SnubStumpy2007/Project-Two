const router = require('express').Router();

const apiRoutes = require('./api');
const authRoute = require('./users');
const dashboardRoutes = require('./dashboardRoutes');
const indexRoutes = require('./index');
const exploreRoute = require('./explore');
const registerRoute = require('./register');
const userRoute = require('./users');
const postRoute = require('../controllers/api/postRoute');
const searchRoute = require('../controllers/api/guestRoute');

// Root or index route to render a landing or home page
router.get('/', (req, res) => {
    res.render('index');  // Assuming you have an 'index.handlebars' in the 'views' folder.
});

router.use('/auth', authRoute);
router.use('/register', registerRoute);
router.use('/users', userRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/index', indexRoutes);
router.use('/explore', exploreRoute);
router.use('/post', postRoute);
router.use('/search', searchRoute);


// Add a catch-all route for any other request (Not Found)
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;