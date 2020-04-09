const express = require('express');
const { getLatestLike } = require('../database/control');
const router = express.Router();


router.get('/', async (req, res) => {
  res.status(200).send(
    await getLatestLike(req.session.user.name, 20)
  );
});

module.exports = router;
