import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Certifique-se de que o arquivo api.js está configurado corretamente
import { useCart } from '../context/CartContext'; // Contexto de carrinho para gerenciar o estado do carrinho

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // Pega os itens do carrinho e a função de limpar o carrinho
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Navegação para redirecionar após finalizar o pedido

  // Calcula o valor total do carrinho
  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [cartItems]);

  // Função para finalizar o pedido
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    const orderItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      setLoading(true);

      // Envia os dados do pedido para o backend
      const response = await api.post('/orders', 
        { 
          items: orderItems, 
          total: total 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Pedido realizado com sucesso!');
      clearCart(); // Limpa o carrinho após finalizar o pedido
      navigate('/orders'); // Redireciona para a página de histórico de pedidos
    } catch (error) {
      console.error('Erro ao finalizar o pedido', error);
      alert('Erro ao finalizar o pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h1>Finalizar Compra</h1>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio. Adicione produtos ao carrinho para continuar.</p>
      ) : (
        <div>
          <h2>Resumo do Carrinho</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <p><strong>{item.name}</strong></p>
                <p>{item.quantity} x R${item.price.toFixed(2)}</p>
                <p>Total: R${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="total">
            <h3>Total: R${total.toFixed(2)}</h3>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="checkout-btn"
          >
            {loading ? 'Finalizando...' : 'Finalizar Pedido'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

