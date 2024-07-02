import React, { useState, useRef, useEffect } from 'react';
import InputLogin from './InputLogin'; // Importando o componente InputLogin
import ErrorModal from './ErrorModal'; // Importando o componente ErrorModal
import '../styles/CadastroForm.css'; // Importando os estilos do formulário

const estadosBrasileiros = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", 
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", 
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", 
  "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", 
  "São Paulo", "Sergipe", "Tocantins"
];

const CadastroForm = ({ onClose }) => { 
  // Estado inicial para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cnpj: '',
    crm: '',
    telefone: '',
    email: '',
    especialidade: '',
    rua_avenida: '',
    numero: '',
    complemento: '',
    cep: '',
    estado: 'Pernambuco', // Definindo Pernambuco como estado padrão
    cidade: '',
    bairro: '',
    pais: 'Brasil', // Definindo Brasil como país padrão
    senha: '',
    confirmaSenha: ''
  });

  // Estados para mensagens de erro
  const [cpfError, setCpfError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmaSenhaError, setConfirmaSenhaError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Referências para os campos de senha e confirmação de senha
  const senhaRef = useRef(null);
  const confirmaSenhaRef = useRef(null);

  // Adiciona o listener de tecla "Esc"
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Limpa o listener ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Atualiza o estado com o novo valor do campo modificado
    setFormData({ ...formData, [name]: value });
  };

  // Função para desabilitar campos
  const handleCpfChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, cpf: value, cnpj: value ? '' : formData.cnpj });
    if (value) setCpfError('');
  };

  const handleCnpjChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, cnpj: value, cpf: value ? '' : formData.cpf });
  };

  // Funções para validar senhas ao perder o foco
  const handleSenhaBlur = () => {
    if (formData.senha.length < 6) {
      setSenhaError('A senha deve ter no mínimo 6 caracteres.');
      setFormData({ ...formData, senha: '' });
      senhaRef.current.focus();
    } else {
      setSenhaError('');
    }
  };

  const handleConfirmaSenhaBlur = () => {
    if (formData.senha !== formData.confirmaSenha) {
      setConfirmaSenhaError('As senhas não coincidem.');
      setFormData({ ...formData, confirmaSenha: '' });
      confirmaSenhaRef.current.focus();
    } else {
      setConfirmaSenhaError('');
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Verificação sequencial de cada campo obrigatório
    if (!formData.nome) {
      setErrorMessage('Por favor, preencha o campo Nome.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.cpf && !formData.cnpj) {
      setCpfError('Por favor, preencha apenas o CPF ou o CNPJ.');
      setErrorMessage('Por favor, preencha apenas o CPF ou o CNPJ.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.crm) {
      setErrorMessage('Por favor, preencha o campo CRM.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.telefone) {
      setErrorMessage('Por favor, preencha o campo Telefone.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.email) {
      setErrorMessage('Por favor, preencha o campo Email.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.especialidade) {
      setErrorMessage('Por favor, preencha o campo Especialidade.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.rua_avenida) {
      setErrorMessage('Por favor, preencha o campo Rua/Avenida.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.numero) {
      setErrorMessage('Por favor, preencha o campo Número.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.cep) {
      setErrorMessage('Por favor, preencha o campo CEP.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.cidade) {
      setErrorMessage('Por favor, preencha o campo Cidade.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.bairro) {
      setErrorMessage('Por favor, preencha o campo Bairro.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.senha) {
      setErrorMessage('Por favor, preencha o campo Senha.');
      setShowErrorModal(true);
      return;
    }

    if (!formData.confirmaSenha) {
      setErrorMessage('Por favor, preencha o campo Confirma Senha.');
      setShowErrorModal(true);
      return;
    }

    // Verifica se as senhas são válidas
    handleSenhaBlur();
    handleConfirmaSenhaBlur();

    if (senhaError || confirmaSenhaError || cpfError) {
      setErrorMessage(senhaError || confirmaSenhaError || cpfError);
      setShowErrorModal(true);
      return;
    }

    // Acredito que aqui seria o ponto de envio de dados do formulário para o backend
    console.log(formData);
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div> {/* Overlay para escurecer o fundo */}
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Cadastro de Profissional da Saúde</h2> {/* Adicionando o título */}
        <div className="form-grid">
          <InputLogin
            type="text"
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
            size="large"
            required
          />
          <InputLogin
            type="text"
            name="cpf"
            label="CPF"
            value={formData.cpf}
            onChange={handleCpfChange}
            size="medium"
            disabled={!!formData.cnpj}
          />
          <InputLogin
            type="text"
            name="cnpj"
            label="CNPJ"
            value={formData.cnpj}
            onChange={handleCnpjChange}
            size="medium"
            disabled={!!formData.cpf}
          />
          <InputLogin
            type="text"
            name="crm"
            label="CRM"
            value={formData.crm}
            onChange={handleChange}
            size="small"
            required
          />
          <InputLogin
            type="text"
            name="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="text"
            name="especialidade"
            label="Especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="text"
            name="rua_avenida"
            label="Rua/Avenida"
            value={formData.rua_avenida}
            onChange={handleChange}
            size="large"
            required
          />
          <InputLogin
            type="text"
            name="numero"
            label="Número"
            value={formData.numero}
            onChange={handleChange}
            size="small"
            required
          />
          <InputLogin
            type="text"
            name="complemento"
            label="Complemento"
            value={formData.complemento}
            onChange={handleChange}
            size="medium"
          />
          <InputLogin
            type="text"
            name="cep"
            label="CEP"
            value={formData.cep}
            onChange={handleChange}
            size="medium"
            required
          />
          <div className="grupo_Inputs medium"> {/* Ajustar o tamanho do campo de seleção */}
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              {estadosBrasileiros.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
          <InputLogin
            type="text"
            name="cidade"
            label="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="text"
            name="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="text"
            name="pais"
            label=""
            value={formData.pais}
            onChange={handleChange}
            size="medium"
            required
          />
          <InputLogin
            type="password"
            name="senha"
            label="Senha (mín 6 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            onBlur={handleSenhaBlur}
            size="medium"
            required
            inputRef={senhaRef}
          />
          <InputLogin
            type="password"
            name="confirmaSenha"
            label="Confirma Senha"
            value={formData.confirmaSenha}
            onChange={handleChange}
            onBlur={handleConfirmaSenhaBlur}
            size="medium"
            required
            inputRef={confirmaSenhaRef}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={onClose}>Voltar</button> 
        </div>
      </form>
      <ErrorModal
        show={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default CadastroForm;
