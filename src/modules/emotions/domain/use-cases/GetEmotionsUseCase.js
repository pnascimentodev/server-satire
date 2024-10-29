const EmotionRepository = require('../../infra/repos/EmotionRepository');

class GetEmotionsUseCase {
  async execute(userId) {
    const emotionRepository = new EmotionRepository();
    return await emotionRepository.findEmotionsByUserId(userId);
  }
}

module.exports = GetEmotionsUseCase;
