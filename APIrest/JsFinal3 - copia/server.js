// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import solicitudesRoutes from './routes/solicitudes.js';
import './utils/telegramBot.js'; // <-- inicia el bot automáticamente

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static('public'));

// RUTAS API
app.use('/api/solicitudes', solicitudesRoutes);

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ ok: false, error: 'Error interno del servidor' });
});

// ARRANQUE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en: http://localhost:${PORT}`);
});
