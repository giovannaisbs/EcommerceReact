import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Opcional: Adicione estilos separados

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpar erros anteriores

    try {
      // Enviar requisição de login para o backend
      const response = await axios.post('/api/auth/login', { email, password });

      // Armazenar o token JWT no localStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar para o painel do administrador ou página inicial
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/products'); // Usuário comum vai para a página de produtos
      }
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      console.error('Erro ao realizar login:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
