const mongodb = require('mongodb');
const assert = require('assert');

const env = process.env;

const { MongoClient } = mongodb;
const databaseUrl = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOSTNAME}:${env.DB_PORT}/${env.DB_DATABASE}`;

let db;

MongoClient.connect(databaseUrl)
  .then(_db => {
    assert.equal(null, err);
    db = _db;
    console.log('Connected to server successfully');
  })
  .catch(err => {
    console.log(err);
  });
