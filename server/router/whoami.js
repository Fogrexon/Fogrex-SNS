const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(201).send({
    username: req.session.user.name,
  });
});

module.exports = router;
