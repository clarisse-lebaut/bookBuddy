const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  categories: {
    type: [String],
    require: true,
  },
  image: String,
  pages: {
    type: Number,
    require: true,
  },
});

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;
