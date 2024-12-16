const Poll = require('../models/Poll');


exports.createPoll = async (req, res) => {
  try {
    const { title, options } = req.body;
    const poll = new Poll({
      title,
      options,
      votes: Array(options.length).fill(0),
      createdBy: req.userId, // Comes from JWT middleware
    });
    await poll.save();
    res.status(201).json({ message: 'Poll created successfully', poll });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.publishPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findByIdAndUpdate(pollId, { isPublished: true });
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    res.json({ message: 'Poll published successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublishedPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ isPublished: true });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find(); 
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Controller to get poll result and determine the winning option
exports.getPollResult = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // Check if poll is published
    if (!poll.isPublished) {
      return res.status(400).json({ message: 'Poll has not been published yet' });
    }

    // Find the option with the highest votes
    const maxVotes = Math.max(...poll.votes);
    const winningOptionIndex = poll.votes.indexOf(maxVotes);
    const winningOption = poll.options[winningOptionIndex];

    // Return the result
    res.status(200).json({
      winningOption,
      voteCounts: poll.votes,
      message: `${winningOption} is winning with ${maxVotes} votes`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
