const { Order, Product } = require('../models');

exports.createOrder = async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id; // Obtém o ID do usuário autenticado

  try {
    const order = await Order.create({ userId, total });

    // Associa os produtos ao pedido
    for (let item of items) {
      await order.addProduct(item.id, { through: { quantity: item.quantity } });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};
