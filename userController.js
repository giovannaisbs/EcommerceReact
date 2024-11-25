// src/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modelo de usuário no banco de dados

// Rota para registrar um novo usuário
const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Verificar se o usuário já existe
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe!' });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o usuário
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role, // Aqui o "role" será 'admin'
  });

  // Gerar um token JWT para o administrador
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({
    message: 'Administrador criado com sucesso!',
    token, // Retorna o token para autenticação
  });
};

module.exports = { registerAdmin };
