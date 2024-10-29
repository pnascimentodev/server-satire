// src/modules/users/infra/models/UserModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um novo usuário no banco de dados
async function createUser(name, email, passwordHash) {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash, // Assumindo que o campo seja 'password' no banco
      },
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

// Função para buscar um usuário pelo email
async function findUserByEmail(email) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Erro ao buscar usuário pelo email:', error);
    throw error;
  }
}

// Função para buscar um usuário pelo ID (caso necessário em outros casos de uso)
async function findUserById(userId) {
  try {
    return await prisma.user.findUnique({
      where: { user_id: userId },
    });
  } catch (error) {
    console.error('Erro ao buscar usuário pelo ID:', error);
    throw error;
  }
}

module.exports = { createUser, findUserByEmail, findUserById };
