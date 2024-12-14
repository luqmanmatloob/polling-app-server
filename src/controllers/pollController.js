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

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ isPublished: true });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
