// Importamos os módulos necessários do React e a instância do axios configurada.
import React, { useState } from 'react';
import api from '../services/api';

// Definimos o componente funcional AtualizaCliente.
function AtualizaCliente() {
  // Usamos o useState para criar um estado local para armazenar os dados do formulário de atualização.
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Função para atualizar o estado local quando o usuário digita nos campos do formulário.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    // Prevenimos o comportamento padrão do formulário, que é recarregar a página.
    e.preventDefault();
    const clientId = localStorage.getItem('clientId'); // Obtemos o ID do cliente do localStorage
    const token = localStorage.getItem('token'); // Obtemos o token do localStorage
    try {
      // Fazemos uma requisição PUT para a rota '/clientes/{id}' com os dados do formulário.
      const response = await api.put(`/clientes/${clientId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluímos o token no cabeçalho da requisição
        },
      });
      // Se a resposta do servidor indicar sucesso, mostramos uma mensagem de sucesso.
      if (response.status === 200) {
        alert('Dados atualizados com sucesso!');
      }
    } catch (error) {
      // Se ocorrer um erro, mostramos uma mensagem de erro.
      alert('Erro ao atualizar dados.');
    }
  };

  // Renderizamos o formulário de atualização.
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Atualizar</button>
    </form>
  );
}

// Exportamos o componente para que ele possa ser usado em outros arquivos.
export default AtualizaCliente;
