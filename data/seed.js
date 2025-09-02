const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('../server/models/Event');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Conectado para seed');

  const events = [
    {
      name: 'Fundação da Camarilla',
      description: 'Estabelecimento da seita em Paris (Vampire corebook).',
      location: { type: 'Point', coordinates: [2.3522, 48.8566] }, // Paris: lon, lat
      date: new Date('1493-01-01'),
      type: 'foundation',
      tags: ['Camarilla', 'Paris']
    },
    {
      name: 'Revolta Anarch',
      description: 'Revolta contra os elders (Clanbook Brujah).',
      location: { type: 'Point', coordinates: [-118.2437, 34.0522] }, // LA
      date: new Date('1944-01-01'),
      type: 'battle',
      tags: ['Anarch', 'Revolta']
    }
    // Adicione mais do lore oficial
  ];

  await Event.insertMany(events);
  console.log('Dados populados');
  process.exit();
});