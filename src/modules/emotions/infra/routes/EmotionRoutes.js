const express = require('express');
const { addEmotion, getEmotions, getEmotionsByDate } = require('../../http/controllers/EmotionsController');
const authMiddleware = require('../../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addEmotion);
router.get('/', authMiddleware, getEmotions);
router.get('/by-date', authMiddleware, getEmotionsByDate);

module.exports = router; // Apenas uma exportação
