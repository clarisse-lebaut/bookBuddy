const express = require('express');
// const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (request, response) => {
  const user = await User.findOne({ email: request.body.email });

  try {
    if (user === null) {
      // const salt = await bcrypt.genSalt(10);
      // const hashed = await bcrypt.hash(request.body.password, salt);
      const newUser = await new User({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password, // I avoid to use bcrypt for now but I know is dangerous to let password be saved like that
        collections: [],
        favorites: [],
      }).save();
      response.status(201).json(newUser);
    } else {
      response.status(409).json({ message: 'User already exist in the database.' });
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

module.exports = router;
