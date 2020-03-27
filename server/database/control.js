const mongoose = require('mongoose');

const { env } = process;

// const databaseUrl = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOSTNAME}:${env.DB_PORT}/${env.DB_DATABASE}`;

const databaseUrl = 'mongodb://fogrex:fogrex@mongo:27017';
mongoose.connect(databaseUrl);

const { Schema } = mongoose;

const User = new Schema({
  username: { type: String, isRequired: true },
  password: { type: String },
  createAt: { type: Date },
});
const Post = new Schema({
  id: { type: String, isRequired: true },
  userID: { type: String },
  text: { type: String },
  date: { type: Date },
  like: { stuff: { type: String } },
});
const Session = new Schema({
  id: { type: String, isRequired: true },
  userID: { type: String },
  date: { type: Date },
});

exports.User = mongoose.model('User', User);
exports.Post = mongoose.model('Post', Post);
exports.Session = mongoose.model('Session', Session);
