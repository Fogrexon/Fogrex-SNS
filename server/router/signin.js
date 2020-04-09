const express = require('express');
const { userSignin } = require('../database/control');

const router = express.Router();


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || username === '' || !password || password === '') {
    res.status(401).send({
      message: 'Username or password is invalid.',
    });
    return;
  }

  const result = await userSignin(username, password);

  if (!result) {
    res.status(401).send({
      message: 'Username or password is incorrect.',
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
