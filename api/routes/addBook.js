const express = require('express');
const User = require('../models/user');
const Book = require('../models/book');

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.body.userId });
    const book = await Book.findOne({ _id: request.body.bookId });

    if (user === null) {
      return response.status(404).json({
        message: "The user doesn't exist in the database.",
      });
    }

    if (book === null) {
      return response.status(404).json({
        message: "The book doesn't exist in the database.",
      });
    }

    const newBook = {
      _id: book._id,
      title: book.title,
      author: book.author,
      categories: book.categories,
      image: book.image,
      pages: book.pages,
      status: { state: 'non-lu', currentPage: 1 },
    };
    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $push: { collections: newBook } }
    );
    return response.status(200).json(updatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
