const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  bannerImgLink: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  server_unique_name: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  summary: {
    type: String,
    required: true,
  },
  contactLink: {
    type: String,
  },
  rawEditor: {
    type: String,
  }
})

module.exports = mongoose.model('club', clubSchema);