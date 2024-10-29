const express = require('express');
const cors = require('cors');
const userRoutes = require('./modules/users/infra/routes/UserRoutes');
const emotionRoutes = require('./modules/emotions/infra/routes/EmotionRoutes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const app = express();
app.use(cors());
app.use(express.json());

// Se precisar passar o prisma para as rotas, você precisa modificar as rotas para aceitá-lo
app.use('/users', userRoutes); // userRoutes não precisa receber prisma se não estiver configurado para isso
app.use('/emotions', emotionRoutes); // emotionRoutes também não precisa receber prisma

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
