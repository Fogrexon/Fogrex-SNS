const express = require('express');
const { getUser } = require('../database/control');
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await getUser(req.session.user.name);
  res.status(200).send(result);
});

module.exports = router;
