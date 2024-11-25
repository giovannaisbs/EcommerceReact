const express = require('express');
const { Order, Product } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Obter histórico de pedidos do usuário autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
});

// Criar um novo pedido
router.post('/', authenticateToken, async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Nenhum item foi enviado no pedido.' });
  }

  try {
    // Calcular o total do pedido e verificar o estoque
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Produto com ID ${item.productId} não encontrado.` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Estoque insuficiente para o produto ${product.name}.` });
      }

      // Atualizar estoque do produto
      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;
    }

    // Criar o pedido
    const order = await Order.create({
      userId: req.user.id,
      total,
      items,
      status: 'Aguardando Pagamento',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
});

// Atualizar status do pedido (somente administradores)
router.patch('/:orderId/status', authenticateToken, async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status é obrigatório.' });
  }

  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido.' });
  }
});

module.exports = router;

