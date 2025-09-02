// Mapa básico com fundo topográfico
var map = L.map('map').setView([0, 0], 2); // Centro no mundo, zoom baixo

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
}).addTo(map);

// Exemplo de marcador (Paris, fundação Camarilla ~1493)
L.marker([48.8566, 2.3522]).addTo(map)
  .bindPopup('Fundação da Camarilla (1493)');

// Defina range da timeline (baseado no lore WoD, ex.: 1000 AD a 2020)
const minDate = new Date('1000-01-01').getTime();
const maxDate = new Date('2025-01-01').getTime(); // Atualize conforme dados

const slider = document.getElementById('timeline');
noUiSlider.create(slider, {
  start: [minDate, maxDate], // Inicial full range
  connect: true,
  range: { min: minDate, max: maxDate },
  format: {
    to: value => new Date(value).toISOString().substring(0, 4), // Mostra ano
    from: value => value
  }
});

// Filtra eventos ao mudar slider
slider.noUiSlider.on('update', async (values) => {
  const start = new Date(parseInt(values[0]));
  const end = new Date(parseInt(values[1]));

  const response = await fetch('/api/events');
  const allEvents = await response.json();
  const filtered = allEvents.filter(event => new Date(event.date) >= start && new Date(event.date) <= end);

  eventLayer.clearLayers();
  filtered.forEach(event => {
    const marker = L.marker([event.location.coordinates[1], event.location.coordinates[0]], {
      icon: icons[event.type] || icons.other
    }).addTo(eventLayer);
    marker.bindPopup(`<h3>${event.name}</h3><p>${event.description}</p><p>Data: ${event.date.substring(0, 10)}</p><p>Tags: ${event.tags.join(', ')}</p>`);
  });
});