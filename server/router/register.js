const express = require('express');
const moment = require('moment');

const router = express.Router();

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const createAt = moment().format('YYYY-MM-DD HH:mm:ss');

  
})