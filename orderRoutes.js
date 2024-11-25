// routes/orderRoutes.js
const express = require('express');
const { Order, Product } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Criar um novo pedido
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const userId = req.user.id;

    const order = await Order.create({ userId, totalPrice, status: 'Aguardando Pagamento' });

    // Relacionar produtos ao pedido
    await order.addProducts(products.map(p => ({ ...p, OrderId: order.id })));
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido.', error });
  }
});

// Listar todos os pedidos (somente para administradores)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos.', error });
  }
});

// Atualizar status do pedido
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status do pedido.', error });
  }
});

module.exports = router;
