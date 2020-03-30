const express = require('express');
const Puid = require('puid');
const { Post, Like } = require('../database/control');

const router = express.Router();

const getLikes = async (id) => {
  const likeUsers = await Like.find({ postid: id }, 'username');
  const likes = [];
  likeUsers.map((val) => {
    likes.push(val.username);
    return true;
  });
  return likes;
};

const getReplied = async (id) => {
  const repliedPosts = await Post.find({ reply: id }, 'id');
  const replied = [];
  repliedPosts.map((val) => {
    replied.push(val.id);
    return true;
  });
  return replied;
};


router.post('/', async (req, res) => {
  const post = {
    id: new Puid().generate(),
    username: req.session.user.name,
    text: req.body.text,
    date: Date.now(),
  };
  if (req.body.reply) {
    const p = await Post.findOne({ id: req.body.reply });
    if (!p) {
      res.status(404).send({
        message: 'Reply not found',
      });
      return;
    }
    post.reply = req.body.reply;
  }
  await Post.create(post);
  res.status(201).send({
    post,
    message: 'Posted completely.',
  });
});


router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ date: -1 }).limit(10);
  let likes = [];
  let replied = [];
  const result = [];
  for (let i = 0; i < posts.length; i += 1) {
    likes.push(getLikes(posts[i].id));
    replied.push(getReplied(posts[i].id));
  }
  likes = await Promise.all(likes);
  replied = await Promise.all(replied);
  for (let i = 0; i < posts.length; i += 1) {
    likes.push(getLikes(posts[i].id));
    result.push({
      id: posts[i].id,
      username: posts[i].username,
      text: posts[i].text,
      date: posts[i].date,
      likes: likes[i],
      reply: posts[i].reply,
      replied: replied[i],
    });
  }

  res.status(200).send(result);
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

  res.status(200).send({
    id: post.id,
    username: post.username,
    text: post.text,
    date: post.date,
    likes: await getLikes(post.id),
    replied: await getReplied(post.id),
  });
});

module.exports = router;
