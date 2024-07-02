"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const connection = mysql_1.default.createConnection({
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
app.use(body_parser_1.default.json());
function generateRandomId() {
    const currentDate = new Date().toISOString().replace(/\D/g, '');
    const randomBytes = crypto_1.default.randomBytes(5).toString('hex');
    return currentDate + randomBytes;
}
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        return false;
    let soma = 0;
    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10)))
        return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11)))
        return false;
    return true;
}
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj))
        return false;
    let tamanho = cnpj.length - 2;
    let digitos = cnpj.substring(tamanho);
    let d1 = parseInt(digitos.charAt(0));
    let d2 = parseInt(digitos.charAt(1));
    let calc = (x) => {
        let numero = cnpj.substring(0, x);
        let y = x - 7;
        let soma = 0;
        let resultado = 0;
        for (let i = x; i >= 1; i--) {
            soma += parseInt(numero.charAt(x - i)) * y--;
            if (y < 2)
                y = 9;
        }
        resultado = 11 - soma % 11;
        return resultado > 9 ? 0 : resultado;
    };
    return calc(tamanho) === d1 && calc(tamanho + 1) === d2;
}
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
/*
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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});
*/
app.post('/login', (req, res) => {
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
        const validPassword = await bcrypt_1.default.compare(senha, user.senha);
        if (!validPassword) {
            return res.status(400).send('Email ou senha incorretos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, id: user.id });
    });
});
app.get('/clientes', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).send('Erro ao buscar clientes');
            return;
        }
        res.json(results);
    });
});
app.post('/clientes', async (req, res) => {
    const { nome, telefone, especialidade, email, senha, rua_avenida, numero, complemento, bairro, cidade, estado, cep, pais, cpf, cnpj, crm } = req.body;
    const id = generateRandomId();
    if (!nome || !telefone || !especialidade || !email || !senha || !rua_avenida || !numero || !bairro || !cidade || !estado || !cep || !pais || !cpf || !cnpj || !crm) {
        res.status(400).send('Campos obrigatórios não preenchidos');
        return;
    }
    if (senha.length < 6) {
        res.status(400).send('A senha deve ter pelo menos 6 caracteres');
        return;
    }
    connection.query('SELECT * FROM clientes WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erro ao verificar email:', err);
            res.status(500).send('Erro ao verificar email');
            return;
        }
        if (results.length > 0) {
            res.status(400).send('Este email já está em uso');
            return;
        }
        if (!validateCPF(cpf)) {
            res.status(400).send('CPF inválido');
            return;
        }
        if (!validateCNPJ(cnpj)) {
            res.status(400).send('CNPJ inválido');
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(senha, 10);
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
});
app.put('/clientes/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, especialidade, email, senha, rua_avenida, numero, complemento, bairro, cidade, estado, cep, pais, cpf, cnpj, crm } = req.body;
    if (!nome || !telefone || !especialidade || !email || !rua_avenida || !numero || !bairro || !cidade || !estado || !cep || !pais || !cpf || !cnpj || !crm) {
        res.status(400).send('Campos obrigatórios não preenchidos');
        return;
    }
    if (senha && senha.length < 6) {
        res.status(400).send('A senha deve ter pelo menos 6 caracteres');
        return;
    }
    if (!validateCPF(cpf)) {
        res.status(400).send('CPF inválido');
        return;
    }
    if (!validateCNPJ(cnpj)) {
        res.status(400).send('CNPJ inválido');
        return;
    }
    const hashedPassword = senha ? await bcrypt_1.default.hash(senha, 10) : undefined;
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
app.delete('/clientes/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).send('Erro ao deletar cliente');
            return;
        }
        res.send('Cliente deletado com sucesso');
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=index%20copy%203.js.map