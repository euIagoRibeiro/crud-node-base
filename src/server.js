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

app.listen(PORT, () => {
    console.log(`----------------------------------------------`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`----------------------------------------------`);
})