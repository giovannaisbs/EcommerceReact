import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

const ProductList = () => {
  const { cart, addItemToCart } = useCart();
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItemToCart(product, 1);  // Adicionando 1 unidade por padrão
  };

  return (
    <div>
      <h1>Catálogo de Produtos</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>R${product.price.toFixed(2)}</p>
          <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
