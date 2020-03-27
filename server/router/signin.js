const express = require('express');
const bcrypt = require('bcrypt');
const { User, Session } = require('../database/control.js');

const router = express.Router();

const SALT_ROUNDS = 10;

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || username === '' || !password || password === '') {
    res.status(400).send({
      message: 'Username or password is invalid.',
    });
    return;
  }

  const users = await User.find({ username });

  if (!!users && users.length > 0) {
    res.status(409).send({
      message: 'This username is already exist.',
    });
    return;
  }

  User.create({
    username,
    password: bcrypt.hashSync(password, SALT_ROUNDS),
    createAt: Date.now,
  });

  res.status(201).send({
    message: 'User was created.',
  });
});
