const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const signup = require('./router/signup.js');
const signin = require('./router/signin.js');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'slsssk',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000, // 1000 * 60 * 60 * 24,
  },
}));


app.use('/signup', signup);
app.use('/signin', signin);


app.use(() => {
  console.log('404 not found.');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});
