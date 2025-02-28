const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

exports.castVote = async (req, res) => {
  try {
    const { pollId, option } = req.body;  // Get the option name from the request body
    const userId = req.userId;

    // Check if user has already voted
    const existingVote = await Vote.findOne({ userId, pollId });
    if (existingVote) return res.status(400).json({ message: 'You have already voted on this poll' });

    // Update vote count
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Find the index of the selected option
    const optionIndex = poll.options.indexOf(option);  // This finds the index of the option
    if (optionIndex === -1) return res.status(400).json({ message: 'Invalid option selected' });

    poll.votes[optionIndex]++;  // Increment the vote count for the selected option
    await poll.save();

    // Save user's vote
    const vote = new Vote({ userId, pollId });
    await vote.save();

    res.json({ message: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
