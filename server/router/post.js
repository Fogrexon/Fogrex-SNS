const express = require('express');
const Puid = require('puid');
const { Post, Like } = require('../database/control');

const router = express.Router();


router.post('/', async (req, res) => {
  const post = {
    id: new Puid().generate(),
    username: req.session.user.name,
    text: req.body.text,
    date: Date.now(),
  };
  if (req.body.reply) {
    const p = Post.findOne({ id: req.body.reply });
    if (!p) {
      res.status(404).send({
        message: 'Reply not found',
      });
      return;
    }
    post.reply = req.body.reply;
  }
  Post.create(post);
  res.status(201).send({
    post,
    message: 'Posted completely.',
  });
});

router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ date: 1 }).limit(10);

  res.status(200).send(posts);
});

router.get('/:postid', async (req, res) => {
  const id = req.params.postid;
  const post = await Post.findOne({ id });
  if (!post) {
    res.status(404).send({
      message: 'post not found',
    });
    return;
  }
  const likes = await Like.find({ postid: id }, 'username');
  post.likes = likes;
  res.status(200).send(post);
});

module.exports = router;
