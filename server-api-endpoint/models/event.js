const mongoose = require('mongoose');
const eventSchema = require('./eventSchema');

module.exports = mongoose.model('event', eventSchema);