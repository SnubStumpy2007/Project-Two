const router = require('express').Router();
const withAuth = require('../utils/auth');

// Use the "withAuth" middleware to protect the dashboard route.
router.get('/', withAuth, (req, res) => {
    // Fetch data or perform actions specific to the dashboard and render the dashboard view.
    res.render('dashboard');
});

module.exports = router;
