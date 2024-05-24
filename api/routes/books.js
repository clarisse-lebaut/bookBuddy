const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Route that allows you to get a list of books of a user's collections
router.get('/', async (_, response) => {
  try {
    const user = await User.findOne({ _id: request.body.userId });
    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    response.status(200).json(user.collections);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
