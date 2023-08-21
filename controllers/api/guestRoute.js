const router = require('express').Router();
const { Post, UserAccount } = require('../../models');
const { Op } = require('sequelize'); // You need to require 'Op' from sequelize
const withAuth = require('../../utils/auth');

router.get('/search', async (req, res) => {
    const userSearch = req.query.homeSearch;

    try {
        const displayResults = await Post.findAll({
            where: {
                [Op.or]: [
                    { Title: { [Op.iLike]: `%${userSearch}%` } }, // use wildcards for substring matches
                    { VenueName: { [Op.iLike]: `%${userSearch}%` } },
                    { Genre: { [Op.iLike]: `%${userSearch}%` } },
                    { UserName: { [Op.iLike]: `%${userSearch}%` } },
                    // Date and created_on likely shouldn't use iLike, but that depends on your setup
                ],
            },
        });
        res.status(200).json(displayResults);
    } catch (err) {
        res.status(500).json({ message: 'Could Not Find Results' });
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const blogContent = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: UserAccount, // This should probably be UserAccount and not Post
                    attributes: ['user_name'], // I've changed this to 'user_name' assuming that's what you store
                },
            ],
        });

        if (!blogContent) {
            // Handle the case where the post was not found
            return res.status(404).json({ message: 'Post not found' });
        }

        const blogPost = blogContent.get({ plain: true });

        res.render('post', {
            ...blogPost,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; // Export the router
