const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../database/control');

const router = express.Router();


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || username === '' || !password || password === '') {
    res.status(401).send({
      message: 'Username or password is incorrect.',
    });
    return;
  }

  const users = await User.findOne({ username });

  if (!users) {
    res.status(401).send({
      message: 'Username or password is incorrect.',
    });
    return;
  }

  if (!await bcrypt.compare(password, users.password)) {
    res.status(401).send({
      message: 'username or password is incorrect.',
    });
    return;
  }

  req.session.user = {
    name: username,
  };

  res.status(200).send({
    message: 'Signed in successfully.',
  });
});


module.exports = router;
