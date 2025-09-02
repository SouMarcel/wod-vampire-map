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

const Event = require('./models/Event');
app.use(express.json()); // Para parses de JSON

// Rota para listar eventos (para frontend)
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar evento (para testes)
app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});