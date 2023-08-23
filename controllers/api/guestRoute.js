// Import necessary modules and middleware
const router = require('express').Router();
const { Op } = require('sequelize'); // Import Sequelize's Op (Operator) for complex queries
const { Post, UserAccount } = require('../../models'); // Import your models
const withAuth = require('../../utils/auth'); // Import authentication middleware

// Route to handle searching for posts
router.get('/search', async (req, res) => {
    const userSearch = req.query.homeSearch; // Get the search query from the request

    try {
        // Use Sequelize's findAll to search for posts with multiple possible fields matching the search query
        const displayResults = await Post.findAll({
            where: {
                [Op.or]: [
                    { Title: { [Op.iLike]: userSearch } }, // Use [Op.iLike] for case-insensitive search
                    { VenueName: { [Op.iLike]: userSearch } },
                    { Genre: { [Op.iLike]: userSearch } },
                    { EventDate: { [Op.iLike]: userSearch } },
                    { UserName: { [Op.iLike]: userSearch } },
                    { created_on: { [Op.iLike]: userSearch } }
                ],
            },
        });

        // Send a JSON response with the search results
        res.status(200).json(displayResults);
    } catch (err) {
        // Handle errors by sending a JSON response with an error message
        res.status(500).json({ message: 'Could Not Find Results' });
    }
});

// Route to display a specific blog post
router.get('/post/:id', async (req, res) => {
    try {
        // Find a specific blog post by its ID and include associated user information
        const blogContent = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ['UserName', 'Title', 'VenueName', 'EventDate', 'Genre', 'PostText', 'created_on'],
                },
            ],
        });

        if (!blogContent) {
            // Handle the case where the post was not found
            return res.status(404).json({ message: 'Post not found' });
        }

        // Map the blog post data to a structured object
        const blogPost = blogContent.map((blogPost) =>
            blogPost.get({ plain: true })
        );

        // Render the 'post' view with the structured blog post data
        res.render('post', {
            ...blogPost,
        });
    } catch (err) {
        // Handle errors by sending a JSON response with an error message
        res.status(500).json(err);
    }
});

// Export the router for use in other parts of the application
module.exports = router;
