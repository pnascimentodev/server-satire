// src/modules/users/infra/repos/UserRepository.js

const UserModel = require('../../domain/models/User');

console.log(__dirname);

class UserRepository {
  async createUser(name, email, passwordHash) {
    const userData = await UserModel.createUser(name, email, passwordHash); // Usando o UserModel
    return userData; // Retornando os dados do usuário
  }

  async findUserByEmail(email) {
    const userData = await UserModel.findUserByEmail(email); // Usando o UserModel
    return userData; // Retornando os dados do usuário ou null
  }
}

module.exports = UserRepository;
