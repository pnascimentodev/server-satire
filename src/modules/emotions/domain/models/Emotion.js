// src/modules/emotions/infra/models/Emotion.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para adicionar uma emoção no banco de dados
async function addEmotion(userId, emotion, intensity, description, date) {
  try {
    console.log('Dados da emoção a serem registrados:', {
      userId,
      emotion,
      intensity,
      description,
      date,
    });

    return await prisma.emotion.create({
      data: {
        user_id: userId,
        emotion_type: emotion,         // Definindo o tipo da emoção
        emotion_intensity: intensity,  // Definindo a intensidade da emoção
        description,                   // Descrição fornecida
        emotion_date: new Date(date),  // Convertendo a data para o tipo Date
      },
    });
  } catch (error) {
    console.error('Erro ao adicionar emoção:', error);
    throw error;
  }
}

// Função para buscar emoções por ID do usuário
async function findEmotionsByUserId(userId) {
  try {
    return await prisma.emotion.findMany({
      where: { user_id: userId },
      orderBy: { emotion_date: 'desc' }, // Ordenando por data em ordem decrescente
    });
  } catch (error) {
    console.error('Erro ao buscar emoções:', error);
    throw error;
  }
}

module.exports = { addEmotion, findEmotionsByUserId };
