// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Seu carrinho está vazio.</p>
          <Link to="/products">Voltar para os Produtos</Link>
        </div>
      ) : (
        <div>
          <table className="cart-items-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Total: ${calculateTotal()}</p>
            <button onClick={clearCart}>Limpar Carrinho</button>
            <Link to="/checkout">
              <button className="checkout-button">Finalizar Compra</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

