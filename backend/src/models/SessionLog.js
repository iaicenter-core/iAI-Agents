const { Schema, model } = require('mongoose');

const sessionLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  response: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('SessionLog', sessionLogSchema);