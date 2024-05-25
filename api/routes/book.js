const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/book');
const User = require('../models/user');

const router = express.Router();

// Route that allows you to get a specific book or a list of book by criteria
router.get('/:id?', async (request, response) => {
  try {
    if (request.params.id) {
      const book = await Book.findOne({ _id: request.params.id });
      return response.status(200).json(book);
    } else {
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
    }
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

// Route that allows you to modify the current page of a read book
router.put('/status/:id', async (request, response) => {
  try {
    const updatedUser = await User.updateOne(
      {
        _id: request.body.userId,
        collections: { $elemMatch: { _id: request.params.id } },
      },
      { $set: { 'collections.$.status.currentPage': request.body.currentPage } }
    );

    response.status(200).json(updatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Route for adding a book in favorites
router.post('/:id', async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.body.userId });
    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    let book =
      user.favorites.filter((book) => book._id.toString() === request.params.id)[0] || null;
    if (book) {
      return response.status(404).json({
        message: "Book already exist in user's favorites.",
      });
    }

    book = await Book.findOne({ _id: request.params.id });
    if (book === null) {
      return response.status(404).json({
        message: 'Book doesnt exist in the database.',
      });
    }

    await User.updateOne({ _id: user._id }, { $push: { favorites: book } });
    return response.status(200).json({
      message: "Book has successfully be added in user's collection.",
    });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Route that allows you to delete a book in user's collection
router.delete('/:id', async (request, response) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: request.body.userId },
      {
        $pull: {
          favorites: { _id: mongoose.Types.ObjectId.createFromHexString(request.params.id) },
        },
      }
    );

    response.status(200).json({
      message: "Book has successfully be deleted in user's collection.",
      update: updatedUser,
    });
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
