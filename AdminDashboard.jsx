import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os pedidos e produtos
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fazendo requisição para a API para buscar pedidos e produtos
        const ordersResponse = await axios.get('http://localhost:5000/api/orders');
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        
        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard do Administrador</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>{orders.length}</h2>
          <p>Pedidos</p>
        </div>
        <div className="stat-item">
          <h2>{products.length}</h2>
          <p>Produtos</p>
        </div>
      </div>

      <div className="actions">
        <h2>Ações Rápidas</h2>
        <div className="action-links">
          <Link to="/admin/orders">Ver Todos os Pedidos</Link>
          <Link to="/admin/products">Gerenciar Produtos</Link>
        </div>
      </div>

      {/* Listando os pedidos recentes */}
      <div className="recent-orders">
        <h2>Pedidos Recentes</h2>
        <ul>
          {orders.slice(0, 5).map((order) => (
            <li key={order.id}>
              <div>Pedido #{order.id}</div>
              <div>Status: {order.status}</div>
            </li>
          ))}
        </ul>
        <Link to="/admin/orders">Ver Todos os Pedidos</Link>
      </div>

      {/* Listando os produtos mais vendidos */}
      <div className="popular-products">
        <h2>Produtos Populares</h2>
        <ul>
          {products.slice(0, 5).map((product) => (
            <li key={product.id}>
              <div>{product.name}</div>
              <div>Preço: ${product.price}</div>
            </li>
          ))}
        </ul>
        <Link to="/admin/products">Gerenciar Produtos</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
