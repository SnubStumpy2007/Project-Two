// routes/explore.js

const express = require('express');
const router = express.Router();

// Define a route for /explore
router.get('/explore', (req, res) => {
    // Handle the '/explore' route logic here
    // This could involve rendering a page or sending data back to the client
    res.render('explore'); // Assuming 'explore' is your Handlebars template
});

module.exports = router;
