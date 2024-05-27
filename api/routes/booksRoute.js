const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Book = require('../models/book');

const router = express.Router();

// Gets a list of books (you can specify criteria)
router.get('/books', async (request, response) => {
  try {
    const filter = {};

    if (request.query.title) {
      filter.title = request.query.title;
    }

    if (request.query.author) {
      filter.author = request.query.author;
    }

    if (request.query.categories) {
      filter.categories = { $in: request.query.categories.split(',') };
    }

    const books = await Book.find(filter);
    return response.status(200).json({ filter, results: books });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Route that allows you to get a list of books of a user's collections
router.get('/book/:id', async (request, response) => {
  try {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.id),
    });

    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    return response.status(200).json(user.collections);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Route that allows you to modify the state of the book [ unread, read, finished ] in user's collection
router.put('/:id', async (request, response) => {
  try {
    const updatedUser = await User.updateOne(
      {
        _id: request.body.userId,
        collections: { $elemMatch: { _id: request.params.id } },
      },
      { $set: { 'collections.$.status.state': request.body.state } }
    );

    response.status(200).json(updatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
