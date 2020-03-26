const mongoose = require('mongoose');

const { env } = process;

const databaseUrl = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOSTNAME}:${env.DB_PORT}/${env.DB_DATABASE}`;

mongoose.connect(databaseUrl);

const { Schema } = mongoose;

const User = new Schema({
  id: { type: String, isRequired: true },
  username: { type: String },
  password: { type: String },
});
const Post = new Schema({
  id: { type: String, isRequired: true },
  userID: { type: String },
  text: { type: String },
  date: { type: Date },
  like: { stuff: { type: String } },
});

exports.User = mongoose.model('User', User);
exports.Post = mongoose.model('Post', Post);
