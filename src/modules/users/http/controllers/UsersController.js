const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../infra/repos/UserRepository');

const userRepository = new UserRepository();

class UserController {
  static async registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userRepository.createUser(name, email, hashedPassword);
      res.status(201).json({ id: user.user_id, name: user.name, email: user.email });
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  }
}

module.exports = UserController;
