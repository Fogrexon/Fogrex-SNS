const mongoose = require('mongoose');

const { env } = process;

const databaseUrl = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOSTNAME}:${env.DB_PORT}/${env.DB_DATABASE}`;

console.log(databaseUrl);
mongoose.connect(databaseUrl);

const { Schema } = mongoose;

const User = new Schema({
  username: { type: String, isRequired: true },
  displayName: { type: String },
  password: { type: String, isRequired: true },
  createAt: { type: Date, isRequired: true },
});
const Post = new Schema({
  id: { type: String, isRequired: true },
  username: { type: String, isRequired: true },
  text: { type: String, isRequired: true },
  createAt: { type: Date, isRequired: true },
  reply: { type: String },
});
const Like = new Schema({
  postid: { type: String, isRequired: true },
  username: { type: String, isRequired: true },
  createAt: { type: Date, isRequired: true },
});

exports.User = mongoose.model('User', User);
exports.Post = mongoose.model('Post', Post);
exports.Like = mongoose.model('Like', Like);
