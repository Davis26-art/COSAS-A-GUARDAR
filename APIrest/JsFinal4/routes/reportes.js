import express from 'express';
import { pool } from '../db.js';
import { enviarCorreo } from '../services/mailer.js';
import { generarPDF } from '../services/pdf.js';
import { enviarTelegram } from '../services/telegram.js';

const router = express.Router();

// CREAR REPORTE
router.post('/', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO reportes (nombre, correo, asunto, mensaje) VALUES ($1,$2,$3,$4) RETURNING *',
      [nombre, correo, asunto, mensaje]
    );

    const reporte = result.rows[0];

    await generarPDF(reporte);
    await enviarCorreo(reporte);
    await enviarTelegram(reporte);

    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
