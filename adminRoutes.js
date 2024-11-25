// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// Registrar um administrador (esta rota pode ser acessada apenas por usuários autenticados)
router.post('/register', userController.registerAdmin);

// Rota protegida para admins visualizarem o dashboard
router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo ao painel de administração!' });
});

module.exports = router;
