// Importamos os módulos necessários do React e a instância do axios configurada.
import React, { useState } from 'react';
import api from './api';

// Definimos o componente funcional CadastroCliente.
function CadastroCliente() {
  // Usamos o useState para criar um estado local para armazenar os dados do formulário.
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Função para atualizar o estado local quando o usuário digita nos campos do formulário.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    // Prevenimos o comportamento padrão do formulário, que é recarregar a página.
    e.preventDefault();
    try {
      // Fazemos uma requisição POST para a rota '/clientes' com os dados do formulário.
      const response = await api.post('/clientes', formData);
      // Se a resposta do servidor indicar sucesso, mostramos uma mensagem de sucesso.
      if (response.status === 201) {
        alert('Cliente cadastrado com sucesso!');
      }
    } catch (error) {
      // Se ocorrer um erro, mostramos uma mensagem de erro.
      alert('Erro ao cadastrar cliente.');
    }
  };

  // Renderizamos o formulário.
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Senha" type="password" required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

// Exportamos o componente para que ele possa ser usado em outros arquivos.
export default CadastroCliente;
