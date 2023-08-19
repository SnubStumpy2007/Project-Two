const router = require('express').Router();
const { Post, UserAccount } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.update(

)

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPost) {
      res.status(404).json({ message: 'You have not created any posts yet!' });
      return;
    }

    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;