const express = require('express');
const { createPoll, publishPoll, getPolls } = require('../controllers/pollController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', verifyToken, isAdmin, createPoll);
router.put('/publish/:pollId', verifyToken, isAdmin, publishPoll);
router.get('/', getPolls);

module.exports = router;
