const router = require('express').Router();

const userRoutes = require('./UserRoutes');

router.use('/users', userRoutes);

module.exports = router;