const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Route that allows you to modify user's rewards
router.post('/rewards/:userId', async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.params.userId });

    if (user === null) {
      return response.status(404).json({
        message: "User doesn't exist in the database.",
      });
    }

    const oldRewards = user.rewards;
    Object.entries(request.body.rewards).forEach(([key, value]) => {
      if (oldRewards[key] && oldRewards[key] !== value) {
        oldRewards[key] = value;
      }
    });

    const updatedUser = await User.updateOne({ _id: user._id }, { $set: { rewards: oldRewards } });

    response.status(200).json({
      message: "User's rewards update with success.",
      updatedUser,
    });
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
