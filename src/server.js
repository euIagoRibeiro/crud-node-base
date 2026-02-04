const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usuarios = [
    {
        "nome": "carlos",
        "email": "carloshenrique@gmail.com"
    }    

];

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

    if (!nome && !email ) return res.status(400).send({ erro: "Nome e email são obrigatórios!" });

    if (!nome) return res.status(400).send({ erro: "Nome é obrigatório!" });

    if (!email) return res.status(400).send({ erro: "Email é obrigatório!" });

    const emailExiste = usuarios.find(user => user.email === email);

    if (emailExiste) return res.status(409).send({ erro: "Este email ja está cadastrado!" });

    const novoUsuario = { nome, email };
    usuarios.push(novoUsuario);

    console.log("Cadastrado: ", novoUsuario);
    res.status(201).json(novoUsuario);

});

app.delete('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const userIndex = usuarios.findIndex(user => user.email === email);

    if (userIndex < 0) return res.status(404).send({ erro: "Usuário não encontrado!" });
    usuarios.splice(userIndex, 1);

    res.status(200).send({ mensagem: "Usuário deletado com sucesso!" });
});

app.put('/usuarios/:email', (req, res) => {

    const { email } = req.params;
    const { nome } = req.body;

    if (!nome) return res.send(400).send({ erro: "Nome é obrigatório" });

    const user = usuarios.find(user => user.email === email);
    if (!user) return res.status(404).send({ erro: "Usuário não encontrado! "});

    user.nome = nome;
    res.status(200).json(user);

});

app.listen(PORT, () => {
    console.log(`----------------------------------------------`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`----------------------------------------------`);
})