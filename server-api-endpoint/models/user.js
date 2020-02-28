const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  matric: {
    type: String,
    default: '-',
  },
  role: {
    type: String,
    default: 'student',
  },
  networkname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  avatarUrl: {
    type: String,
    default: '',
    max: 1024,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema);