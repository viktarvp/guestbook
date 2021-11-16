const { Schema, model } = require('mongoose');

const schema = new Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model('Comment', schema);
