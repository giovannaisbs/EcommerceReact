// routes/productRoutes.js
const express = require('express');
const { Product } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Criar um novo produto
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const product = await Product.create({ name, description, price, stock, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto.', error });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos.', error });
  }
});

// Editar um produto
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    await product.update({ name, description, price, stock, category });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto.', error });
  }
});

// Remover um produto
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    await product.destroy();
    res.json({ message: 'Produto removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover produto.', error });
  }
});

module.exports = router;
