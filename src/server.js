const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usuarios = [];

app.get('/', (req, res) => {
    res.send({
        message: 'API rodando com sucesso!',
        docs: 'Acesse /usuarios para ver a lista'
    });
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    
    const { nome, email } = req.body;

    if (!nome && !email ) return res.status(400).send({ erro: "Nome e email são obrigatórios!"});

    if (!nome) return res.status(400).send({ erro: "Nome é obrigatório!"});

    if (!email) return res.status(400).send({ erro: "Email é obrigatório!"});

    const emailExiste = usuarios.find(user => user.email === email);

    if (emailExiste) return res.status(409).send({ erro: "Este email ja está cadastrado!"});

    const novoUsuario = { nome, email };
    usuarios.push(novoUsuario);

    console.log("Cadastrado: ", novoUsuario);
    res.status(201).json(novoUsuario);

});

app.listen(PORT, () => {
    console.log(`----------------------------------------------`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`----------------------------------------------`);
})