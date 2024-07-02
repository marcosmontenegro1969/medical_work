// src/components/InputLogin.js
import React from 'react';
import '../styles/InputLogin.css'; // Importando os estilos do InputLogin

function InputLogin({ type, name, label, value, onChange, size, onFocus, autoComplete, inputRef = null }) {
  return (
    <div className={`grupo_Inputs ${size}`}> {/* Adicionando a classe de tamanho */}
      <input
        id={name}
        type={type}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete={autoComplete}
        ref={inputRef} // Adicionando a referência ao input
      />
      <label htmlFor={name} className={`label_Contorno`}>
        {label}
      </label>
    </div>
  );
}

export default InputLogin;
