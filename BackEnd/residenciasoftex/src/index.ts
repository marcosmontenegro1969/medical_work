import express, { Request, Response, NextFunction } from 'express';
import mysql, { Connection } from 'mysql';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

app.use(bodyParser.json());

function generateRandomId(): string {
  const currentDate = new Date().toISOString().replace(/\D/g, '');
  const randomBytes = crypto.randomBytes(5).toString('hex');
  return currentDate + randomBytes;
}

function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  let resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  let tamanho: number = cnpj.length - 2;
  let digitos: string = cnpj.substring(tamanho);
  let d1: number = parseInt(digitos.charAt(0));
  let d2: number = parseInt(digitos.charAt(1));
  let calc = (x: number): number => {
    let numero: string = cnpj.substring(0, x);
    let y: number = x - 7;
    let soma: number = 0;
    let resultado: number = 0;
    for (let i = x; i >= 1; i--) {
      soma += parseInt(numero.charAt(x - i)) * y--;
      if (y < 2) y = 9;
    }
    resultado = 11 - soma % 11;
    return resultado > 9 ? 0 : resultado;
  };
  return calc(tamanho) === d1 && calc(tamanho + 1) === d2;
}

interface User {
  id: string;
  email: string;
  isAdmin: boolean; // Adicionando a propriedade isAdmin
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function autenticarAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
}

function validarSala(sala: any): boolean {
  if (
    !sala.titulo_especialidade ||
    !sala.descricao_especialidade ||
    !sala.descricao_sala ||
    !sala.regras ||
    !sala.valor_hora ||
    !sala.comodidades ||
    !sala.equipamentos ||
    !sala.seguranca ||
    !sala.disponibilidade ||
    !sala.rua_avenida ||
    !sala.numero ||
    !sala.bairro ||
    !sala.cidade ||
    !sala.estado ||
    !sala.cep ||
    !sala.pais ||
    !sala.nome_proprietario ||
    !sala.telefone_proprietario ||
    !sala.url_foto1 ||
    !sala.url_foto2 ||
    !sala.url_foto3 ||
    !sala.url_foto4
  ) {
    return false;
  }
  return true;
}


/*
#
# --> CADASTRO DE CLIENTES
#
*/

// Rota para login de clientes
app.post('/login', (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  connection.query('SELECT * FROM clientes WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Erro ao verificar email:', err);
      return res.status(500).send('Erro ao verificar email');
    }

    if (results.length === 0) {
      return res.status(400).send('Email ou senha incorretos');
    }

    const user = results[0];

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(400).send('Email ou senha incorretos');
    }

    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: user.id });
  });
});

// Rota para buscar todos os clientes
app.get('/clientes', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).send('Erro ao buscar clientes');
      return;
    }
    res.json(results);
  });
});

// Rota para cadastrar um novo cliente
app.post('/clientes', async (req: Request, res: Response) => {
  const { nome, telefone, especialidade, email, senha, rua_avenida, numero, complemento, bairro, cidade, estado, cep, pais, cpf, cnpj, crm } = req.body;
  const id = generateRandomId();

  if (!nome || !telefone || !especialidade || !email || !senha || !rua_avenida || !numero || !bairro || !cidade || !estado || !cep || !pais || !(cpf || cnpj)) {
    res.status(400).send('Campos obrigatórios não preenchidos');
    return;
  }

  if (senha.length < 6) {
    res.status(400).send('A senha deve ter pelo menos 6 caracteres');
    return;
  }

  if (cpf && !validateCPF(cpf)) {
    res.status(400).send('CPF inválido');
    return;
  }

  if (cnpj && !validateCNPJ(cnpj)) {
    res.status(400).send('CNPJ inválido');
    return;
  }

  const user = req.user; // Obtém o usuário da requisição

  if (user && !user.isAdmin) { // Se o usuário não é admin, o campo CRM é obrigatório
    if (!crm) {
      res.status(400).send('Campo CRM é obrigatório');
      return;
    }
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const novoCliente = {
    id,
    nome,
    telefone,
    especialidade,
    email,
    senha: hashedPassword,
    rua_avenida,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    pais,
    cpf,
    cnpj,
    crm
  };

  connection.query('INSERT INTO clientes SET ?', novoCliente, (err) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      res.status(500).send('Erro ao inserir cliente');
      return;
    }
    res.status(201).send('Cliente cadastrado com sucesso');
  });
});


// Rota para buscar um cliente específico
app.get('/clientes/:id', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;

  connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      return res.status(500).send('Erro ao buscar cliente');
    }
    if (results.length === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.json(results[0]);
  });
});


// Rota para atualizar um cliente existente
app.put('/clientes/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, telefone, especialidade, email, senha, rua_avenida, numero, complemento, bairro, cidade, estado, cep, pais, cpf, cnpj, crm } = req.body;

  if (!nome || !telefone || !especialidade || !email || !rua_avenida || !numero || !bairro || !cidade || !estado || !cep || !pais || !(cpf || cnpj) || !crm) {
    res.status(400).send('Campos obrigatórios não preenchidos');
    return;
  }

  if (senha && senha.length < 6) {
    res.status(400).send('A senha deve ter pelo menos 6 caracteres');
    return;
  }

  if (cpf && !validateCPF(cpf)) {
    res.status(400).send('CPF inválido');
    return;
  }

  if (cnpj && !validateCNPJ(cnpj)) {
    res.status(400).send('CNPJ inválido');
    return;
  }

  const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;

  const updatedCliente = {
    nome,
    telefone,
    especialidade,
    email,
    senha: hashedPassword,
    rua_avenida,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    pais,
    cpf,
    cnpj,
    crm
  };

  connection.query('UPDATE clientes SET ? WHERE id = ?', [updatedCliente, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).send('Erro ao atualizar cliente');
      return;
    }
    res.send('Cliente atualizado com sucesso');
  });
});


// Rota para deletar um cliente
app.delete('/clientes/:id', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;

  connection.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).send('Erro ao deletar cliente');
    }
    res.send('Cliente deletado com sucesso');
  });
});

/*
#
# --> CADASTRO DE SALAS
#
*/

// Rota para cadastrar uma nova sala
app.post('/salas', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const data = req.body;

  if (!validarSala(data)) {
    return res.status(400).send('Campos obrigatórios não preenchidos');
  }

  const novaSala = { ...data };

  connection.query('INSERT INTO salas SET ?, data_cadastro = NOW()', novaSala, (err) => {
    if (err) {
      console.error('Erro ao inserir sala:', err);
      return res.status(500).send('Erro ao inserir sala');
    }
    res.status(201).send('Sala cadastrada com sucesso');
  });
});


// Rota para buscar todas as salas
app.get('/salas', authenticateToken, (req: Request, res: Response) => {
  connection.query('SELECT * FROM salas', (err, results) => {
    if (err) {
      console.error('Erro ao buscar salas:', err);
      return res.status(500).send('Erro ao buscar salas');
    }
    res.json(results);
  });
});

// Rota para atualizar uma sala existente
app.put('/salas/:id', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;

  if (!validarSala(newData)) {
    return res.status(400).send('Campos obrigatórios não preenchidos');
  }

  connection.query('UPDATE salas SET ? WHERE id = ?', [newData, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar sala:', err);
      return res.status(500).send('Erro ao atualizar sala');
    }
    res.send('Sala atualizada com sucesso');
  });
});

// Rota para desativar uma sala
app.put('/salas/:id/desativar', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;

  connection.query('UPDATE salas SET ativo = FALSE WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao desativar sala:', err);
      return res.status(500).send('Erro ao desativar sala');
    }
    res.send('Sala desativada com sucesso');
  });
});


// Rota para ativar uma sala
app.put('/salas/:id/ativar', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;

  connection.query('UPDATE salas SET ativo = TRUE WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao ativar sala:', err);
      return res.status(500).send('Erro ao ativar sala');
    }
    res.send('Sala ativada com sucesso');
  });
});


// Rota para buscar apenas as salas ativadas
app.get('/salas/ativas', authenticateToken, (req: Request, res: Response) => {
  connection.query('SELECT * FROM salas WHERE ativo = TRUE', (err, results) => {
    if (err) {
      console.error('Erro ao buscar salas ativadas:', err);
      return res.status(500).send('Erro ao buscar salas ativadas');
    }
    res.json(results);
  });
});

// Rota para buscar apenas as salas inativas
app.get('/salas/inativas', authenticateToken, (req: Request, res: Response) => {
  connection.query('SELECT * FROM salas WHERE ativo = FALSE', (err, results) => {
    if (err) {
      console.error('Erro ao buscar salas inativas:', err);
      return res.status(500).send('Erro ao buscar salas inativas');
    }
    res.json(results);
  });
});

/* Rota para deletar uma sala - Sem uso para não perder histórico.
app.delete('/salas/:id', authenticateToken, autenticarAdmin, (req: Request, res: Response) => {
  const { id } = req.params;

  connection.query('DELETE FROM salas WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar sala:', err);
      return res.status(500).send('Erro ao deletar sala');
    }
    res.send('Sala deletada com sucesso');
  });
});
*/

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

