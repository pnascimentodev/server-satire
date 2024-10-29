const EmotionRepository = require('../../infra/repos/EmotionRepository');
const AddEmotionUseCase = require('../../domain/use-cases/AddEmotionUseCase');
const GetEmotionsUseCase = require('../../domain/use-cases/GetEmotionsUseCase');
const { formatEmotionData } = require('../formatters/EmotionFormatter');


exports.addEmotion = async (req, res) => {
  try {
    console.log('User ID:', req.userId); // Adicione este log
    const { emotion, intensity, description, date } = req.body;
    const addEmotionUseCase = new AddEmotionUseCase();
    const newEmotion = await addEmotionUseCase.execute({
      userId: req.userId,
      emotion,
      intensity,
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
    const getEmotions = new GetEmotionsUseCase();
    const emotions = await getEmotions.execute(req.userId);
    const formattedEmotions = emotions.map(formatEmotionData);
    res.status(200).json({ emotions: formattedEmotions });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar emoções', error: error.message });
  }
};
