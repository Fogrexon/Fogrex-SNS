const express = require('express');
const { userCreate } = require('../database/control');

const router = express.Router();


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || username === '' || !password || password === '') {
    res.status(400).send({
      message: 'Username or password is invalid.',
    });
    return;
  }

  const result = await userCreate(username, password);

  if (!result) {
    res.status(409).send({
      message: 'This username is already exist.',
    });
    return;
  }

  res.status(201).send({
    message: 'User was created.',
  });
});

module.exports = router;
