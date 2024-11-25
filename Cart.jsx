import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeItemFromCart, getTotal } = useCart();

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId);
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product.id}>
              <h3>{item.product.name}</h3>
              <p>Quantidade: {item.quantity}</p>
              <p>R${(item.product.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(item.product.id)}>Remover</button>
            </div>
          ))}
          <hr />
          <h3>Total: R${getTotal().toFixed(2)}</h3>
          <Link to="/checkout">Ir para Checkout</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
