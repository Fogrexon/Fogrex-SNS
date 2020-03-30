const express = require('express');
const { User, Post, Like } = require('../database/control');

const likeRouter = express.Router();
const unlikeRouter = express.Router();


likeRouter.post('/:postid', async (req, res) => {
  const like = {
    username: req.session.user.name,
    postid: req.params.postid,
  };

  const user = await User.findOne({ username: like.username });
  const post = await Post.findOne({ id: like.postid });

  if (!user || !post) {
    res.status(404).send({
      message: 'username or postid is not found',
    });
    return;
  }

  const liked = await Like.findOne(like);

  if (liked) {
    res.status(409).send({
      message: 'already liked',
    });
    return;
  }
  await Like.create(like);
  res.status(200).send({
    message: 'liked',
  });
});

unlikeRouter.post('/:postid', async (req, res) => {
  const like = {
    username: req.session.user.name,
    postid: req.params.postid,
  };

  const user = await User.findOne({ username: like.username });
  const post = await Post.findOne({ id: like.postid });

  if (!user || !post) {
    res.status(404).send({
      message: 'username or postid is not found',
    });
    return;
  }

  const liked = await Like.findOne(like);

  if (!liked) {
    res.status(409).send({
      message: "didn't liked",
    });
    return;
  }
  await Like.remove(liked);
  res.status(200).send({
    message: 'unliked',
  });
});


module.exports.like = likeRouter;
module.exports.unlike = unlikeRouter;
