const AddEmotionUseCase = require('../../domain/use-cases/AddEmotionUseCase');
const GetEmotionsUseCase = require('../../domain/use-cases/GetEmotionsUseCase');
const { formatEmotionData } = require('../../http/formatters/EmotionFormatter');

exports.addEmotion = async (req, res) => {
  try {
    const { emotion, description, date } = req.body;
    const addEmotionUseCase = new AddEmotionUseCase();
    const newEmotion = await addEmotionUseCase.execute({
      userId: req.userId,
      emotion,
      description,
      date,
    });
    res.status(201).json({ message: 'Emoção registrada com sucesso!', emotion: newEmotion });
  } catch (error) {
    console.error('Erro ao registrar emoção:', error);
    res.status(500).json({ message: 'Erro ao registrar emoção', error: error.message });
  }
};

exports.getEmotions = async (req, res) => {
  try {
    const getEmotionsUseCase = new GetEmotionsUseCase();
    const emotions = await getEmotionsUseCase.execute(req.userId);

    // Contando emoções usando o campo 'emotion_type'
    const emotionCounts = emotions.reduce((acc, emotion) => {
      const type = emotion.emotion_type; // Usando 'emotion_type' em vez de 'emotion'
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ emotionCounts });
  } catch (error) {
    console.error('Erro ao buscar emoções:', error);
    res.status(500).json({ message: 'Erro ao buscar emoções', error: error.message });
  }
};
