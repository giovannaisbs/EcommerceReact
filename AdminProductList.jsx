import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto', error);
        alert('Erro ao excluir produto.');
      }
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Produtos</h1>
      <Link to="/admin/products/add">Adicionar Produto</Link>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div>
          {products.length === 0 ? (
            <p>Não há produtos cadastrados.</p>
          ) : (
            products.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Preço: {product.price}</p>
                <p>Estoque: {product.stock}</p>
                <Link to={`/admin/products/edit/${product.id}`}>Editar</Link>
                <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductList;

