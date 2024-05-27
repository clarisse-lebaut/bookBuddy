const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Book = require('../models/book');

const router = express.Router();

// Route that allows you to get a list of books of a user's collections
router.get('/id?', async (request, response) => {
  console.log('lol');
  try {
    if (request.params.id) {
      const user = await User.findOne({
        _id: mongoose.Types.ObjectId.createFromHexString(request.params.id),
      });

      if (user === null) {
        return response.status(404).json({
          message: "User doesn't exist in the database.",
        });
      }

      return response.status(200).json(user.collections);
    } else {
      const books = await Book.find({});
      return response.status(200).json(books);
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
