const mongoose = require('mongoose');

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
  collections: {
    type: Array,
    default: [],
  },
  favorites: {
    type: Array,
    default: [],
  },
  rewards: {
    read1: {
      type: Boolean,
      default: false,
    },
    read10: {
      type: Boolean,
      default: false,
    },
    read50: {
      type: Boolean,
      default: false,
    },
    read100: {
      type: Boolean,
      default: false,
    },
    read500: {
      type: Boolean,
      default: false,
    },
    read1000: {
      type: Boolean,
      default: false,
    },
    collection1: {
      type: Boolean,
      default: false,
    },
    collection10: {
      type: Boolean,
      default: false,
    },
    collection50: {
      type: Boolean,
      default: false,
    },
    collection100: {
      type: Boolean,
      default: false,
    },
    collection500: {
      type: Boolean,
      default: false,
    },
    collection1000: {
      type: Boolean,
      default: false,
    },
    favorites1: {
      type: Boolean,
      default: false,
    },
    favorites10: {
      type: Boolean,
      default: false,
    },
    favorites50: {
      type: Boolean,
      default: false,
    },
    favorites100: {
      type: Boolean,
      default: false,
    },
    favorites500: {
      type: Boolean,
      default: false,
    },
    favorites1000: {
      type: Boolean,
      default: false,
    },
    kingOfReading: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
