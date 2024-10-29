exports.formatEmotionData = (emotion) => ({
    id: emotion.id,
    emotion: emotion.emotion_type,
    intensity: `${emotion.emotion_intensity}/10`,
    description: emotion.description,
    date: new Date(emotion.emotion_date).toLocaleDateString('pt-BR'),
  });
  