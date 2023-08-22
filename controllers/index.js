const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./api/userRoute');
// const dashboardRoutes = require('./dashboardRoutes');

// Home routes (assuming this was from your 'controllers/index.js')
router.use('/', homeRoutes);

// API routes
router.use('/api', apiRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Dashboard routes
//router.use('/dashboard', dashboardRoutes);

// Root or index route to render a landing or home page 
// (This has been moved down to avoid conflicts with other routes)
router.get('/', (req, res) => {
    res.render('index');  // Assuming you have an 'index.handlebars' in the 'views' folder.
});

// Add a catch-all route for any other request (Not Found)
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;
