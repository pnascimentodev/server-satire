const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EmotionRepository {
  async addEmotion(userId, emotion, description, date) {
    try {
      return await prisma.emotion.create({
        data: {
          user_id: userId,
          emotion_type: emotion,
          description,
          emotion_date: new Date(date),
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar emoção:', error);
      throw new Error('Não foi possível adicionar a emoção.');
    }
  }

  async findEmotionsByUserId(userId) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      return await prisma.emotion.findMany({
        where: {
          user_id: userId,
          emotion_date: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: { emotion_date: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao buscar emoções:', error);
      throw new Error('Não foi possível buscar as emoções.');
    }
  }
 
}


module.exports = EmotionRepository;