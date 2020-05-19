const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
    default: null,
  },
  time: {
    type: String,
    default: new Date(),
  },
  receiverName: {
    type: String,
    required: true,
    default: null,
  }
})

module.exports = mongoose.model('chat', chatSchema);