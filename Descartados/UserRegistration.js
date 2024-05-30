// src/pages/UserRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserRegistration.css';

const UserRegistration = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    especialidade: '',
    celular: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('URL_DA_SUA_API', form)
      .then(response => {
        console.log('Cadastro realizado com sucesso', response);
      })
      .catch(error => {
        console.error('Erro ao cadastrar', error);
      });
  };

  return (
    <div className="registration-form">
      <h2>Cadastro de Médico</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default UserRegistration;
