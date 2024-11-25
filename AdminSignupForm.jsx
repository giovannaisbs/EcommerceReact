// src/pages/AdminSignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // O valor "admin" indica que esse usuário será um administrador
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, role };

    try {
      const response = await axios.post('/api/users/register', userData);
      console.log(response.data);
      navigate('/admin/dashboard'); // Redireciona para o painel de administração após o cadastro
    } catch (error) {
      console.error('Erro ao criar administrador:', error);
    }
  };

  return (
    <div>
      <h1>Criar Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Tipo de Usuário</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            disabled
          >
            <option value="admin">Administrador</option>
            {/* Em uma situação real, você teria outros tipos de usuários, como 'cliente' ou 'vendedor' */}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default AdminSignupForm;
