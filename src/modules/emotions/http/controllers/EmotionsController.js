const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

        const emotionCounts = emotions.reduce((acc, emotion) => {
            const type = emotion.emotion_type;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({ emotionCounts });
    } catch (error) {
        console.error('Erro ao buscar emoções:', error);
        res.status(500).json({ message: 'Erro ao buscar emoções', error: error.message });
    }
};

exports.getEmotionsByDate = async (req, res) => {
    const { year, month } = req.query;
    try {
        console.log('Rota getEmotionsByDate chamada com:', req.query);
        
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Use prisma aqui para buscar as emoções
        const emotions = await prisma.emotion.findMany({
            where: {
                user_id: req.userId,
                emotion_date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                emotion_date: true,
            },
        });

        const emotionDates = emotions.map(emotion => emotion.emotion_date.toISOString().split('T')[0]);

        res.status(200).json({ emotionDates });
    } catch (error) {
        console.error('Erro ao buscar emoções por data:', error);
        res.status(500).json({ message: 'Erro ao buscar emoções', error: error.message });
    }
};
