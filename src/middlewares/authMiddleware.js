const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o token contém o campo 'userId'
    if (!decoded.userId) {
      return res.status(400).json({ status: 'error', message: 'Token inválido: userId não encontrado.' });
    }

    req.userId = decoded.userId; // Armazena o userId decodificado
    console.log('User ID decifrado:', req.userId); // Log do userId decifrado

    next();
  } catch (err) {
    console.error('Erro de autenticação:', err.message); // Log do erro

    // Tratar erro de expiração do token
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token expirado. Faça login novamente.' });
    }

    // Tratar outros erros de verificação
    res.status(403).json({ status: 'error', message: 'Token inválido.' });
  }
}

module.exports = authMiddleware;
