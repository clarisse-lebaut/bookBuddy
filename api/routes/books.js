const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/', async (_, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
