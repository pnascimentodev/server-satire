// src/modules/users/infra/models/UserModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(name, email, passwordHash) {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

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

async function updateUser(userId, updates) {
  try {
    return await prisma.user.update({
      where: { user_id: userId },
      data: updates,
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}

// Exporte as funções como um objeto
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
};
