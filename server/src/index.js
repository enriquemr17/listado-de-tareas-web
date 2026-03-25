require('dotenv').config(); // carga el .env
const express = require('express'); // framework de NODE.JS que permite crear servidor web y rutas http
require('./config/env'); // carga variables de entorno .env

const app = express(); // inicializa el servidor sobre APP

app.use(cors());
app.use(express.json()); // permite que EXPRESS lea en fomrato JSON

const taskRoutes = require('./routes/task.routes'); // importación de rutas
app.use ('/api/v1/tasks', taskRoutes); // montaje de rutas (API V1= version1)

// Ruta de verificación mientras construimos la API por capas.
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// MIDDLEWARE DE ERRORES (evita que el servidor se caiga)

app.use ((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({error: 'No encontrado'})
  }

  console.error(err); 
  res.status(500).json({error: 'Error interno del servidor'}); 
}); 

// LOCAL: escucha el puerto. VERCEL: exporta la app. 

if (process.env.NODE_ENV !== 'production') {
  const {PORT} = require ('./config/env'); 
  app.listen(PORT, () => {
    console.log('Servidor en http://localhost:${PORT}'); 
  }); 
}

module.exports = app; // vercel necesita esto 





