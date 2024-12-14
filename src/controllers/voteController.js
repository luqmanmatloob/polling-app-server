const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

exports.castVote = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const userId = req.userId;

    // Check if user has already voted
    const existingVote = await Vote.findOne({ userId, pollId });
    if (existingVote) return res.status(400).json({ message: 'You have already voted on this poll' });

    // Update vote count
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    poll.votes[optionIndex]++;
    await poll.save();

    // Save user's vote
    const vote = new Vote({ userId, pollId });
    await vote.save();

    res.json({ message: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
