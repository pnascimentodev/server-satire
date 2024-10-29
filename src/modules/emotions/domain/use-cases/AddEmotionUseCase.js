const EmotionRepository = require('../../infra/repos/EmotionRepository');

class AddEmotionUseCase {
  async execute({ userId, emotion, intensity, description, date }) {
    const intensityMapping = { baixa: 1, média: 2, alta: 3 };
    const intensityValue = intensityMapping[intensity.toLowerCase()];
    if (intensityValue === undefined) throw new Error('Intensidade inválida. Use: baixa, média ou alta.');

    const emotionRepository = new EmotionRepository();
    return await emotionRepository.addEmotion(userId, emotion, intensityValue, description, date);
  }
}

module.exports = AddEmotionUseCase;
