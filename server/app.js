const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
});