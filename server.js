const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração de conexão MySQL
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banconew',
});

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Configuração do CORS
app.use(cors());

// Rota para obter todos os itens ou um item específico
app.get('/itens/:id?', (req, res) => {
    const { id } = req.params;

    if (id) {
        // Consulta MySQL para obter um item específico
        conexao.query('SELECT * FROM itens WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao consultar o banco de dados' });
            } else if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ erro: 'Item não encontrado' });
            }
        });
    } else {
        // Consulta MySQL para obter todos os itens
        conexao.query('SELECT * FROM itens', (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao consultar o banco de dados' });
            } else {
                res.json(results);
            }
        });
    }
});

// Rota para adicionar um novo item
app.post('/itens', (req, res) => {
    const { nome } = req.body;

    if (nome) {
        // Inserção MySQL para adicionar um novo item
        conexao.query('INSERT INTO itens (nome) VALUES (?)', [nome], (err, results) => {
            if (err) {
                console.error('Erro ao inserir no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao inserir no banco de dados' });
            } else {
                const novoItem = { id: results.insertId, nome };
                res.json({ mensagem: 'Item adicionado com sucesso', novoItem });
            }
        });
    } else {
        res.status(400).json({ erro: 'Nome do item não fornecido' });
    }
});

// Rota para atualizar um item existente
app.put('/itens/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (id && nome) {
        // Atualização MySQL para atualizar um item existente
        conexao.query('UPDATE itens SET nome = ? WHERE id = ?', [nome, id], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao atualizar no banco de dados' });
            } else if (results.affectedRows > 0) {
                res.json({ mensagem: 'Item atualizado com sucesso' });
            } else {
                res.status(404).json({ erro: 'Item não encontrado' });
            }
        });
    } else {
        res.status(400).json({ erro: 'ID ou nome do item não fornecidos' });
    }
});

// Rota para remover um item
app.delete('/itens/:id', (req, res) => {
    const { id } = req.params;

    if (id) {
        // Exclusão MySQL para remover um item
        conexao.query('DELETE FROM itens WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Erro ao excluir no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao excluir no banco de dados' });
            } else if (results.affectedRows > 0) {
                res.json({ mensagem: 'Item removido com sucesso' });
            } else {
                res.status(404).json({ erro: 'Item não encontrado' });
            }
        });
    } else {
        res.status(400).json({ erro: 'ID do item não fornecido' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
