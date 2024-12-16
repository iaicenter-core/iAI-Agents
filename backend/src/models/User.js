const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema);