// src/modules/users/infra/repos/UserRepository.js

const UserModel = require('../../domain/models/User');

class UserRepository {
  // Criação de um novo usuário
  async createUser(name, email, passwordHash) {
    try {
      const userData = await UserModel.createUser(name, email, passwordHash); // Chama a função do modelo
      return userData; // Retorna os dados do usuário
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  // Busca um usuário pelo e-mail
  async findUserByEmail(email) {
    try {
      const userData = await UserModel.findUserByEmail(email); // Chama a função do modelo
      return userData; 
    } catch (error) {
      console.error('Erro ao buscar usuário pelo email:', error);
      throw new Error('Erro ao buscar usuário pelo email');
    }
  }

  // Atualiza os dados de um usuário
  async updateUser(userId, updates) {
    try {
      const updatedUser = await UserModel.updateUser(userId, updates); // Chama a função do modelo
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }
}

module.exports = UserRepository;
