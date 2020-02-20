const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  uniqueName: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  start: { type: Date },
  end: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
  borderColor: { type: String },
  backgroundColor: { type: String },
  rawEditor: { type: String },
  signUpLink: { type: String },
  imageUrl: { type: String },
  venue: { type: String },
  createdBy: { type: String },
  tags: [String]
})

module.exports = eventSchema;