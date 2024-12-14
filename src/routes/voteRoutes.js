const express = require('express');
const { castVote } = require('../controllers/voteController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/cast', verifyToken, castVote);

module.exports = router;
