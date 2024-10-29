const bcrypt = require('bcryptjs');

class AddUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser(name, email, passwordHash);
  }
}

module.exports = AddUserUseCase;
