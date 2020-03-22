const express = require('express');

const register = require('./router/register');

const app = express();

app.use('/register', register);

app.use(() => {
  console.log('404 not found.');
});
