import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      await api.put(`/products/${id}`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Produto atualizado com sucesso!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
      alert('Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p>Carregando produto...</p>;
  }

  return (
    <div>
      <h1>Editar Produto</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>
        <div>
          <label>Preço</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div>
          <label>Estoque</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </div>
        <button onClick={handleSaveProduct} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
