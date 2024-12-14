const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [{ type: String, required: true }], // Poll options
  votes: [{ type: Number, default: 0 }],       // Votes for each option
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin ID
  isPublished: { type: Boolean, default: false }, // Publish status
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
