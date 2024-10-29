const AddEmotionUseCase = require('../../domain/use-cases/AddEmotionUseCase');
const GetEmotionsUseCase = require('../../domain/use-cases/GetEmotionsUseCase');
const { formatEmotionData } = require('../../../utils/ResponseFormatter');

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
    const formattedEmotions = emotions.map(formatEmotionData);
    res.status(200).json({ emotions: formattedEmotions });
  } catch (error) {
    console.error('Erro ao buscar emoções:', error);
    res.status(500).json({ message: 'Erro ao buscar emoções', error: error.message });
  }
};