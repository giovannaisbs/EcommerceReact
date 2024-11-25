import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminOrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get('/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Erro ao carregar pedidos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Erro ao atualizar status do pedido', error);
    }
  };

  return (
    <div>
      <h1>Administração de Pedidos</h1>
      {loading ? (
        <p>Carregando pedidos...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>Não há pedidos.</p>
          ) : (
            orders.map(order => (
              <div key={order.id}>
                <h3>Pedido #{order.id}</h3>
                <p>Status: {order.status}</p>
                <button onClick={() => handleUpdateStatus(order.id, 'Enviado')}>Marcar como Enviado</button>
                <button onClick={() => handleUpdateStatus(order.id, 'Entregue')}>Marcar como Entregue</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrderDashboard;
