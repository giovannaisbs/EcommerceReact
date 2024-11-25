import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '16px', padding: '8px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Produtos</Link>
      <Link to="/checkout">Carrinho</Link>
      <Link to="/orders">Meus Pedidos</Link>
    </nav>
  );
};

export default Navbar;
