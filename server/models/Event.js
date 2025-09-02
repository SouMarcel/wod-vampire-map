const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ex: "Fundação da Camarilla"
  description: { type: String }, // Detalhes do lore (oficial apenas)
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [lon, lat] para GeoJSON
  },
  date: { type: Date, required: true }, // Ex: new Date('1493-01-01')
  type: { type: String, enum: ['foundation', 'battle', 'conspiracy', 'other'], required: true }, // Tipos para ícones
  tags: { type: [String] } // Ex: ['Camarilla', 'Tremere']
});

eventSchema.index({ location: '2dsphere' }); // Para queries geo

module.exports = mongoose.model('Event', eventSchema);