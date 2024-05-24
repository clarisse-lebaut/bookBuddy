const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/book');
const User = require('../models/user');

const router = express.Router();

// Route that allows you to get a specific book (:action = :id) or a list of book that correspond to criteria (:action = :filter)
router.get('/:action', async (request, response) => {
  try {
    const action = request.params.action;

    if (mongoose.Types.ObjectId.isValid(action)) {
      const book = await Book.findById(action);

      if (book === null) {
        return response.status(404).json({ message: "Book doesn't exit in the database." });
      }

      return response.status(200).json(book);
    }

    const categoryFilter = [
      'science-fiction',
      'fantaisie',
      'nouvelle',
      'horreur',
      'roman',
      'policier',
    ];
    if (categoryFilter.includes(action)) {
      const books = await Book.find({ categories: { $in: [action] } });

      if (books === null) {
        return response
          .status(404)
          .json({ message: "Books with that category doesn't exit in the database." });
      }

      return response.status(200).json(books);
    }

    return response
      .status(404)
      .json({ message: "Request parameter doesn't correspond to criteria." });
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
