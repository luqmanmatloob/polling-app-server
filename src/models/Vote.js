const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);
