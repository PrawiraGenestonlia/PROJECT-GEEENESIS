const mongoose = require('mongoose');
const eventSchema = require('./eventSchema');

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  favouriteEvents: [eventSchema],
  interestedEvents: [eventSchema],
  participatedEvents: [eventSchema]
});

module.exports = mongoose.model('profile', profileSchema);