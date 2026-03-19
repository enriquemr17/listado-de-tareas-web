const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de verificación mientras construimos la API por capas.
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`TaskFlow API running on http://localhost:${PORT}`);
});

