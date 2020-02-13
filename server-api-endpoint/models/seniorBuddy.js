const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  "senior buddy": {
    type: String,
    required: true,
    max: 255,
    min: 6,
  }
})

module.exports = mongoose.model('seniorbuddy', userSchema);