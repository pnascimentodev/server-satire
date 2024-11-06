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
      const existingUser = await userRepository.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }
  
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
        console.log('Usuário encontrado:', user); // Adicione esta linha
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, name: user.name }); // Retorna o nome do usuário
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
}


  static async logoutUser(req, res) {
    try {
      res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      res.status(500).json({ error: 'Erro ao fazer logout.' });
    }
  }
  static async editUser(req, res) {
    const { userId, name, email, password } = req.body;

    try {
      if (email) {
        const existingUser = await userRepository.findUserByEmail(email);
        if (existingUser && existingUser.user_id !== userId) {
          return res.status(400).json({ error: 'E-mail já está em uso.' });
        }
      }
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10);

      const updatedUser = await userRepository.updateUser(userId, updates);
      res.json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      res.status(500).json({ error: 'Erro ao editar o usuário.' });
    }
  }
}

module.exports = UserController;
