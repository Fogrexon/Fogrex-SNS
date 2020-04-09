const express = require('express');
const { getLatestPost, getPostDetail, createPost } = require('../database/control');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await createPost(
    req.session.user.name,
    req.body.text,
    req.body.reply
  );

  if (!result) {
    res.status(404).send({
      message: 'Reply not found',
    });
    return;
  }
  res.status(201).send({
    message: 'Posted completely.',
  });
});


router.get('/', async (req, res) => {
  res.status(200).send(
    await getLatestPost(req.session.user.name, 20)
  );
});

router.get('/:postid', async (req, res) => {
  const result = await getPostDetail(req.params.postid, req.session.user.name);
  if (!result) {
    res.status(404).send({
      message: 'post not found',
    });
    return;
  }

  res.status(200).send(result);
});

module.exports = router;
