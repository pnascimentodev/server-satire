const express = require('express');
const UserController = require('../../http/controllers/UsersController');
const authMiddleware = require('../../../../middlewares/authMiddleware');


const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', authMiddleware, UserController.logoutUser);
router.post('/edit', authMiddleware, UserController.editUser);

module.exports = router; // Apenas uma exportação
