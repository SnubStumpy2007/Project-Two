const router = require('express').Router();

const apiRoutes = require('./api');
const authRoutes = require('./users');
const dashboardRoutes = require('./dashboardRoutes');

// Root or index route to render a landing or home page
router.get('/', (req, res) => {
    res.render('index');  // Assuming you have an 'index.handlebars' in the 'views' folder.
});

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

// Add a catch-all route for any other request (Not Found)
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;