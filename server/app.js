const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const signUp = require('./router/signup');
const signIn = require('./router/signin');
const post = require('./router/post');
const { like, unlike } = require('./router/likes');
const whoAmI = require('./router/whoami');
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
    maxAge: 10 * 60 * 1000, // 1000 * 60 * 60 * 24,
  },
}));


app.use('/api/signup', signUp);
app.use('/api/signin', signIn);
app.use('/api/post', sessionCheck, post);
app.use('/api/like', sessionCheck, like);
app.use('/api/unlike', sessionCheck, unlike);
app.use('/api/whoami', sessionCheck, whoAmI);


app.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).send({
    message: 'not found',
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});
