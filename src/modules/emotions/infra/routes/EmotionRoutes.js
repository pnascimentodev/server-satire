const express = require('express');
const { addEmotion, getEmotions } = require('../../http/controllers/EmotionsController');
const authMiddleware = require('../../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addEmotion);
router.get('/', authMiddleware, getEmotions);

module.exports = router; // Apenas uma exportação
