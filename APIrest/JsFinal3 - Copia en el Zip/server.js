// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import solicitudesRoutes from './routes/solicitudes.js';
import path from 'path';

dotenv.config();

const app = express();

// ====================
// MIDDLEWARE
// ====================
app.use(cors());
app.use(express.json());

// Servir frontend (carpeta public)
app.use(express.static('public'));

// ====================
// RUTAS API
// ====================
app.use('/api/solicitudes', solicitudesRoutes);

// ====================
// RUTA PRINCIPAL
// ====================
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// ====================
// ARRANQUE
// ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en: http://localhost:${PORT}`);
});
