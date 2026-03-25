const path = require('path');

// Solo carga .env en local, en Vercel no hace falta
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
  });
}

// En Vercel el puerto lo gestiona él, en local usamos el .env
module.exports = {
  PORT: process.env.PORT || 3000
};
