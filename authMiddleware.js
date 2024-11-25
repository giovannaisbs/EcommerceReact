const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Supondo que você tenha um modelo de Usuário no Sequelize
const router = express.Router();

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha é válida
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },  // Payload do token (informações do usuário)
      process.env.JWT_SECRET,            // Chave secreta para assinar o token
      { expiresIn: '1h' }               // Expiração do token (1 hora)
    );

    // Retornar o token para o frontend
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

// Rota para registrar um novo usuário (opcional, para administração)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Este e-mail já está registrado.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user', // Definir o role como 'user' ou 'admin'
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de logout (opcional, mas útil)
router.post('/logout', (req, res) => {
  // O logout pode ser tratado no frontend (removendo o token do localStorage)
  res.json({ message: 'Logout bem-sucedido' });
});

module.exports = router;
