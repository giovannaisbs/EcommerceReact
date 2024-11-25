import React, { useEffect, useState } from 'react';
import api from '../api'; // Certifique-se de que o arquivo api.js está configurado corretamente

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função que busca os pedidos do usuário
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await api.get('/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(response.data); // Armazena os pedidos no estado
      } catch (error) {
        console.error('Erro ao carregar histórico de pedidos', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchOrders(); // Chama a função para buscar os pedidos
  }, []); // A dependência vazia faz com que essa função seja chamada apenas uma vez, quando o componente for montado

  return (
    <div className="order-history">
      <h1>Histórico de Pedidos</h1>
      {loading ? (
        <p>Carregando pedidos...</p> // Exibe enquanto os pedidos estão sendo carregados
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>Você ainda não fez nenhum pedido.</p> // Caso o usuário não tenha pedidos
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Pedido #{order.id}</h3>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> R${order.total.toFixed(2)}</p>
                <p><strong>Data do Pedido:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      <p>{product.name} - {product.quantity} x R${product.price.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
