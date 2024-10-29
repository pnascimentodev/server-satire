exports.formatEmotionData = (emotion) => ({
  id: emotion.id,
  emotion: emotion.emotion_type,
  description: emotion.description,
  date: new Date(emotion.emotion_date).toLocaleDateString('pt-BR'),
});