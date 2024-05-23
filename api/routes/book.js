const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/book');

const router = express.Router();

router.get('/:param', async (request, response) => {
  try {
    const param = request.params.param;

    if (mongoose.Types.ObjectId.isValid(param)) {
      const book = await Book.findById(param);
      cience - fiction;
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
    if (categoryFilter.includes(param)) {
      const books = await Book.find({ categories: { $in: [param] } });

      if (books === null) {
        return response
          .status(404)
          .json({ message: "Books with that category doesn't exit in the database." });
      }

      return response.status(200).json(books);
    }

    return response
      .status(404)
      .json({ message: "Request parameter doesn't correspond to critera." });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

router.put('/:id', (request, response) => {});

module.exports = router;
