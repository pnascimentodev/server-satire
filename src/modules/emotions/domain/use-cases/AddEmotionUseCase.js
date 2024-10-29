const EmotionRepository = require('../../infra/repos/EmotionRepository');

class AddEmotionUseCase {
  async execute({ userId, emotion, description, date }) {
    const emotionRepository = new EmotionRepository();
    return await emotionRepository.addEmotion(userId, emotion, description, date);
  }
}

module.exports = AddEmotionUseCase;