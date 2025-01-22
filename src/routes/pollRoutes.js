const express = require('express');
const { createPoll, publishPoll, getPublishedPolls, getAllPolls, getPollResult } = require('../controllers/pollController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Polls
 *   description: Poll management endpoints
 */

/**
 * @swagger
 * /api/polls/create:
 *   post:
 *     tags: [Polls]
 *     summary: Create a new poll
 *     description: Creates a new poll that can be published later.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - options
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Best Programming Language"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Python", "Java"]
 *     responses:
 *       201:
 *         description: Poll successfully created
 *       401:
 *         description: Unauthorized
 */
router.post('/create', verifyToken, isAdmin, createPoll);

/**
 * @swagger
 * /api/polls/publish/{pollId}:
 *   put:
 *     tags: [Polls]
 *     summary: Publish a poll
 *     description: Publishes a poll that was previously created.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pollId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the poll to publish
 *     responses:
 *       200:
 *         description: Poll successfully published
 *       400:
 *         description: Invalid poll ID
 */
router.put('/publish/:pollId', verifyToken, isAdmin, publishPoll);

/**
 * @swagger
 * /api/polls/getPublishedPolls:
 *   get:
 *     tags: [Polls]
 *     summary: Get all published polls
 *     description: Returns all the published polls.
 *     responses:
 *       200:
 *         description: List of published polls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 */
router.get('/getPublishedPolls', getPublishedPolls);

/**
 * @swagger
 * /api/polls:
 *   get:
 *     tags: [Polls]
 *     summary: Get all polls
 *     description: Returns all polls, published or not.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all polls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 */
router.get('/', getAllPolls);

/**
 * @swagger
 * /api/polls/result/{pollId}:
 *   get:
 *     tags: [Polls]
 *     summary: Get poll result
 *     description: Retrieves the results of a poll by its ID.
 *     parameters:
 *       - name: pollId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the poll to get results for
 *     responses:
 *       200:
 *         description: Poll results
 *       404:
 *         description: Poll not found
 */
router.get('/result/:pollId', getPollResult);

module.exports = router;