const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// Listar todos os produtos ou aplicar filtros
router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  try {
    const filters = {};
    if (category) filters.category = category;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice); // maior ou igual
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice); // menor ou igual
    }

    const products = await Product.findAll({ where: filters });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Buscar produto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
});

// Criar um novo produto (apenas administradores)
router.post('/', async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  try {
    const newProduct = await Product.create({ name, description, price, stock, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto.' });
  }
});

// Atualizar um produto existente (apenas administradores)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto.' });
  }
});

// Deletar um produto (apenas administradores)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    await product.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto.' });
  }
});

module.exports = router;
