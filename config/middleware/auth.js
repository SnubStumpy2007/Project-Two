// Import the User model
const { UserAccount } = require('../models');

// Middleware function for user authentication
const authenticateUser = async (req, res, next) => {
    // Check if a user session ID exists
    if (req.session.userId) {
        try {
            // Attempt to find a user by their session ID
            const user = await UserAccount.findByPk(req.session.userId);
            
            if (user) {
                // If a user is found, attach the user object to the request
                req.user = user;
                next(); // Continue to the next middleware or route
            } else {
                // If no user is found, return a 401 Unauthorized status
                res.status(401).send({ message: 'Authentication required' });
            }
        } catch (error) {
            // Handle server errors with a 500 Internal Server Error status
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    } else {
        // If no session ID exists, return a 401 Unauthorized status
        res.status(401).send({ message: 'Authentication required' });
    }
}

// Export the authenticateUser middleware for use in routes
module.exports = {
    authenticateUser
};