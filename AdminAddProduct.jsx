import React, { useState } from 'react';
import api from '../api';

const AdminAddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const product = { name, description, price, stock };
      await api.post('/products', product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto', error);
      alert('Erro ao adicionar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Preço</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Estoque</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Produto'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
