const router = require('express').Router();

const apiRoutes = require('./api');
const authRoutes = require('./users');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/api', apiRoutes); 
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

// Add a catch-all route for any other request (Not Found)
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;
