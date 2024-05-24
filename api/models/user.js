const mongoose = require('mongoose');
const Book = require('./book');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  collections: [],
  favorites: [],
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;
