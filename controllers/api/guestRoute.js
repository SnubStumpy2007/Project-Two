const router = require('express').Router();
const { Post, UserAccount } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/search', async (req, res) => {
    const userSearch = req.query.homeSearch;

    try {
        const displayResults = await Post.findAll({
            where: {
                [Op.or]: [
                    {Title: { [Op.iLike]: userSearch}},
                    {VenueName: { [Op.iLike]: userSearch}},
                    {Genre: { [Op.iLike]: userSearch}},
                    {EventDate: { [Op.iLike]: userSearch}},
                    {UserName: { [Op.iLike]: userSearch}},
                    {created_on: { [Op.iLike]: userSearch}}
                    
                ],
            },
    });
    res.status(200).json(displayResults);
  } catch (err) {
    res.status(500).json({message: 'Could Not Find Results'});
  }
});

router.get('/post/:id', async (req, res) => {
    try {
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
  
      const blogPost = blogContent.map((blogPost) =>
            blogPost.get({ plain:true })
      );
  
      res.render('post', {
        ...blogPost,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });