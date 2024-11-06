const express = require('express');
const cors = require('cors');
const userRoutes = require('./modules/users/infra/routes/UserRoutes');
const emotionRoutes = require('./modules/emotions/infra/routes/EmotionRoutes');
const { PrismaClient } = require('@prisma/client');

// Reutilizando a conexão em ambientes serverless
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma; // Apenas no ambiente de desenvolvimento

// Garantir a conexão com o banco de dados
prisma.$connect()
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });


const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/emotions', emotionRoutes);

const port = process.env.PORT || 3000; // Porta dinâmica
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});