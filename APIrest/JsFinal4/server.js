import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportesRoutes from './routes/reportes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/reportes', reportesRoutes);

// Ruta simple de prueba
app.get('/', (req, res) => {
  res.send('Servidor activo y API lista en /api/reportes');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
