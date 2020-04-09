const express = require('express');
const { likePost, unlikePost } = require('../database/control');

const likeRouter = express.Router();
const unlikeRouter = express.Router();


likeRouter.post('/:postid', async (req, res) => {

  const result = await likePost(req.params.postid, req.session.user.name);


  if (result == -2) {
    res.status(404).send({
      message: 'Post not found.',
    });
    return;
  }
  if (result == -1) {
    res.status(404).send({
      message: 'Already liked.',
    });
    return;
  }
  res.status(200).send({
    message: 'liked',
  });
});

unlikeRouter.post('/:postid', async (req, res) => {
  const result = await unlikePost(req.params.postid, req.session.user.name);


  if (!result) {
    res.status(404).send({
      message: 'Post is not liked',
    });
    return;
  }
  res.status(200).send({
    message: 'unliked',
  });
});


module.exports.like = likeRouter;
module.exports.unlike = unlikeRouter;
