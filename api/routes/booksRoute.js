const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");

const router = express.Router();

// Get all book (by criteria too)
router.get("/books", async (request, response) => {
  try {
    const filter = {};

    if (request.query.title) {
      filter.title = request.query.title;
    }

    if (request.query.author) {
      filter.author = request.query.author;
    }

    if (request.query.categories) {
      filter.categories = { $in: request.query.categories.split(",") };
    }

    const books = await Book.find(filter);
    return response.status(200).json({ filter, results: books });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Post a new book
router.post("/books/new", async (request, response) => {
  try {
    await new Book({
      title: request.body.title,
      author: request.body.author,
      categories: request.body.categories,
      image: request.body.image,
      pages: request.body.pages,
    }).save();
    return response.status(200).json({message: "bouquin ajouté avec succées"})
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Get collection of a user
router.get("/collection/:userId", async (request, response) => {
  try {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.userId),
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

router.get("/users", async (request, response) => {
  try {
    const users = await User.find({});

    if (users === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    return response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Get favorites of a user
router.get("/favorites/:userId", async (request, response) => {
  try {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.userId),
    });

    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    return response.status(200).json(user.favorites);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Modify the state of a book in user's collection [ unread, read, finished ]
router.put("/collection/:userId/book/:bookId/state/:state", async (request, response) => {
  try {
    const updatedUser = await User.updateOne(
      {
        _id: request.params.userId,
        collections: { $elemMatch: { _id: request.params.bookId } },
      },
      { $set: { "collections.$.status.state": request.params.state } }
    );

    response.status(200).json(updatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Modify current page number a read book
router.put(
  "/collection/:userId/book/:bookId/currentPage/:currentPage",
  async (request, response) => {
    try {
      const updatedUser = await User.updateOne(
        {
          _id: request.params.userId,
          collections: { $elemMatch: { _id: request.params.bookId } },
        },
        { $set: { "collections.$.status.currentPage": parseInt(request.params.currentPage) } }
      );

      response.status(200).json(updatedUser);
    } catch (error) {
      response.status(404).json({ message: error.message });
    }
  }
);

// Add a book in user's collection
router.post("/collection/:userId/new/:bookId", async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.params.userId });
    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    const book = await Book.findOne({ _id: request.params.bookId });
    if (book === null) {
      return response.status(404).json({
        message: "Book doesn't exist in the database.",
      });
    }

    const bookExistInCollection = user.collections.some(
      (collection) => collection._id.toString() === request.body.bookId
    );
    if (bookExistInCollection) {
      return response.status(404).json({
        message: "Book already exist in user's collection.",
      });
    }

    const newBook = {
      _id: book._id,
      title: book.title,
      author: book.author,
      categories: book.categories,
      image: book.image,
      pages: book.pages,
      status: { state: "unread", currentPage: 1 },
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

// Add a book in user's favorites
router.post("/favorites/:userId/new/:bookId", async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.params.userId });
    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    const book = await Book.findOne({ _id: request.params.bookId });
    if (book === null) {
      return response.status(404).json({
        message: "Book doesn't exist in the database.",
      });
    }

    const bookExistInFavorite = user.favorites.some(
      (favorite) => favorite._id.toString() === request.params.bookId
    );
    if (bookExistInFavorite) {
      return response.status(404).json({
        message: "Book already exist in user's collection.",
      });
    }

    const newBook = {
      _id: book._id,
      title: book.title,
      author: book.author,
      categories: book.categories,
      image: book.image,
      pages: book.pages,
    };
    const updatedUser = await User.updateOne({ _id: user._id }, { $push: { favorites: newBook } });
    return response.status(200).json(updatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Delete a book from user's collection
router.delete("/collection/:userId/remove/:bookId", async (request, response) => {
  try {
    // Get the user and make sure he exists in the database.
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.userId),
    });

    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    // Makes sure the book exists in user's collections
    if (user.collections.some((book) => book._id.toString() === request.params.bookId) === false) {
      return response.status(404).json({
        message: "Book doesn't exist in user's collections.",
      });
    }

    // Updates user's collections by deleting the specified book
    const updatedUser = await User.updateOne(
      { _id: request.params.userId },
      {
        $pull: {
          collections: { _id: mongoose.Types.ObjectId.createFromHexString(request.params.bookId) },
        },
      }
    );

    // Return a response the response if everything is fine
    response.status(200).json({
      message: "Book successfully deleted in user's collection",
      updates: updatedUser,
    });
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

// Delete a book from user's favorites
router.delete("/favorites/:userId/remove/:bookId", async (request, response) => {
  try {
    // Get the user and make sure he exists in the database.
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.userId),
    });

    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    // Makes sure the book exists in user's favorites
    if (user.favorites.some((book) => book._id.toString() === request.params.bookId) === false) {
      return response.status(404).json({
        message: "Book doesn't exist in user's collections.",
      });
    }

    // Updates user's favorites by deleting the book
    const updatedUser = await User.updateOne(
      { _id: request.params.userId },
      {
        $pull: {
          favorites: { _id: mongoose.Types.ObjectId.createFromHexString(request.params.bookId) },
        },
      }
    );

    // Return a response the response if everything is fine
    response.status(200).json({
      message: "Book successfully deleted in user's collection",
      updates: updatedUser,
    });
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
