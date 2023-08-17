const { User } = require('../models');

const authenticateUser = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).send({ message: 'Authentication required' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    } else {
        res.status(401).send({ message: 'Authentication required' });
    }
}

module.exports = {
    authenticateUser
};
