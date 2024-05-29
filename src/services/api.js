// Importamos a biblioteca axios, que é usada para fazer chamadas HTTP.
import axios from 'axios';

// Criamos uma instância do axios configurada com uma baseURL. 
// Isso significa que todas as chamadas feitas usando essa instância do axios 
// começarão com 'http://localhost:3000'.
const api = axios.create({
  baseURL: 'http://localhost:3000', // Endereço do back-end fornecido nos prints
});

// Exportamos a instância do axios configurada. 
// Isso permite que possamos importá-la e usá-la em outros arquivos do nosso projeto.
export default api;
