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


app.use('/users', userRoutes);
app.use('/emotions', emotionRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
