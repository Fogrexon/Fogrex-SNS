const express = require('express');
const signup = require('./router/signup.js');

const app = express();

app.use('/signup', signup);

app.use(() => {
  console.log('404 not found.');
});
