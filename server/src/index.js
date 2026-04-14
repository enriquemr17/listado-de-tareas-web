require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express(); // ✅ PRIMERO crear app

app.use(cors());
app.use(express.json());

// ✅ Servir frontend desde la carpeta public (DESPUÉS de crear app)
app.use(express.static(path.join(__dirname, '../../')));

const taskRoutes = require('./routes/task.routes');
app.use('/api/v1/tasks', taskRoutes);



// Middleware de errores
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'No encontrado' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;



