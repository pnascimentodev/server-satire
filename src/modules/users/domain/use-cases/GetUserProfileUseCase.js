const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class GetUserProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { user, token };
  }
}

module.exports = GetUserProfileUseCase;
