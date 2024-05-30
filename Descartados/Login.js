// Importamos os módulos necessários do React e a instância do axios configurada.
import React, { useState } from 'react';
import api from './api';

// Definimos o componente funcional Login.
function Login() {
  // Usamos o useState para criar um estado local para armazenar os dados do formulário de login.
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Função para atualizar o estado local quando o usuário digita nos campos do formulário.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    // Prevenimos o comportamento padrão do formulário, que é recarregar a página.
    e.preventDefault();
    try {
      // Fazemos uma requisição POST para a rota '/login' com os dados do formulário.
      const response = await api.post('/login', formData);
      // Se a resposta do servidor indicar sucesso, armazenamos o token JWT e o id do cliente.
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('clientId', response.data.id);
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      // Se ocorrer um erro, mostramos uma mensagem de erro.
      alert('Erro ao fazer login.');
    }
  };

  // Renderizamos o formulário de login.
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Senha" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}

// Exportamos o componente para que ele possa ser usado em outros arquivos.
export default Login;
