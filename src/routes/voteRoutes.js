const express = require('express');
const { castVote } = require('../controllers/voteController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: Voting operations
 */

/**
 * @swagger
 * /api/votes/cast:
 *   post:
 *     tags: [Votes]
 *     summary: Cast a vote
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pollId
 *               - optionId
 *             properties:
 *               pollId:
 *                 type: string
 *                 example: "65d24b8c1d5501a3d4"
 *               optionId:
 *                 type: string
 *                 example: "65d24b8c1d5501a3d5"
 *     responses:
 *       200:
 *         description: Vote recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote cast successfully"
 *       400:
 *         description: Invalid vote data
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */
router.post('/cast', verifyToken, castVote);

module.exports = router;