const express = require('express');

const router = express.Router();


router.post('/', async (req, res) => {
  
  delete req.session.user;
  res.status(200).send({
    message: 'Signed out.',
  });
});

module.exports = router;
