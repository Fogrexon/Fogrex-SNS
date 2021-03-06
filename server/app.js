const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const signUp = require('./router/signup');
const signIn = require('./router/signin');
const post = require('./router/post');
const { like, unlike } = require('./router/likes');
const whoAmI = require('./router/whoami');
const me = require('./router/me');
const myLike = require('./router/mylike');
const signOut = require('./router/signout');
const sessionCheck = require('./libs/sessionChecker');

const app = express();

app.use((req, res, next) => {
  console.log(req.originalUrl);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
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
    maxAge: 24 * 60 * 60 * 1000, // 1000 * 60 * 60 * 24,
  },
}));


app.use('/signup', signUp);
app.use('/signin', signIn);
app.use('/post', sessionCheck, post);
app.use('/like', sessionCheck, like);
app.use('/unlike', sessionCheck, unlike);
app.use('/whoami', sessionCheck, whoAmI);
app.use('/me', sessionCheck, me);
app.use('/mylike', sessionCheck, myLike);
app.use('/signout', sessionCheck, signOut);


app.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).send({
    message: 'not found',
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});
