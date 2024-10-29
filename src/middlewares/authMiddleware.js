const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Certifique-se de que `userId` está presente no token
    console.log('User ID decifrado:', req.userId); // Log do userId decifrado
    next();
  } catch (err) {
    console.error('Erro de autenticação:', err.message); // Log do erro
    res.status(403).json({ status: 'error', message: 'Token inválido.' });
  }
}

module.exports = authMiddleware;
