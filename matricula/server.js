const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
const port = 4000

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'faculdade'
})

app.use(bodyParser.json())
app.use(cors())

app.get('/alunos/:id?', (req, res) => {
    const { id } = req.params;

    if (id) {
        conexao.query('SELECT * FROM matricula WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados', err);
                res.status(500).json({ erro: 'Erro ao consultar o banco de dados' });
            } else if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ erro: 'Aluno não encontrado' });
            }
        });
    } else {
        conexao.query('SELECT * FROM matricula', (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados', err);
                res.status(500).json({ erro: 'Erro ao consultar o banco de dados' });
            } else {
                res.json(results);
            }
        });
    }
});

app.post('/alunos', (req, res) => {
    const {nomeCompleto, dataNascimento, sexo, endereco, cpf, rg, telefone} = req.body
    
    if(nomeCompleto && dataNascimento && sexo && endereco && cpf && rg && telefone){
        conexao.query('INSERT INTO matricula (nome_completo, data_nascimento, sexo, endereco, cpf, rg, telefone) values (?, ?, ?, ?, ?, ?, ?)', [nomeCompleto, dataNascimento, sexo, endereco, cpf, rg, telefone], (err, results) => {
            if(err){
                console.error('Erro ao inserir o banco de dados', err)
                res.status(500).json({erro: 'Erro ao inserir o banco de dados'})
            }else{
                const novoAluno = {
                    id: results.insertId,
                    nomeCompleto,
                    dataNascimento,
                    sexo,
                    endereco,
                    cpf,
                    rg,
                    telefone
                }
                res.json({mensagem: 'Aluno adicionado com sucesso', novoAluno})
            }
        })
    }else{
        res.status(400).json({erro: 'Dados não fornecido'})
    }
})

app.put('/alunos/:id', (req, res) => {
    const { id } = req.params
    const {nomeCompleto, dataNascimento, sexo, endereco, cpf, rg, telefone} = req.body

    if(id && nomeCompleto && dataNascimento && sexo && endereco && cpf && rg && telefone){
        conexao.query('UPDATE matricula SET nome_completo = ?, data_nascimento = ?, sexo = ?, endereco = ?, cpf = ?, rg = ?, telefone = ?  WHERE id = ?', [nomeCompleto, dataNascimento, sexo, endereco, cpf, rg, telefone, id], (err, results) => {
            if(err){
                console.error('Erro ao atualizar no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao atualizar no banco de dados' });
            }else if(results.affectedRows > 0){
                res.json({mensagem: 'Aluno atualizado com sucesso'})
            }else{
                res.status(404).json({erro: 'Aluno não encontrado'})
            }
        })
    }else{
        res.status(400).json({erro: 'ID ou dados não fornecidos'})
    }
})

app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params

    if(id){
        conexao.query('DELETE FROM matricula WHERE id = ?', [id], (err, results) => {
            if(err){
                console.error('Erro ao inserir no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao inserir no banco de dados' });
            }else if(results.affectedRows > 0){
                res.json({ mensagem: 'Aluno removido com sucesso' });
            }else{
                res.status(404).json({erro: 'Aluno não encontrado'})
            }
        })
    }else{
        res.status(400).json({erro: 'ID do aluno não fornecido'})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})