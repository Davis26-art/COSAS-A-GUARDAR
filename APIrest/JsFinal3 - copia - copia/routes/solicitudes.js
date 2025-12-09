// routes/solicitudes.js
import express from 'express';
import { pool } from '../db.js';
import { createEncryptedPDFForRecipient, deleteFile } from '../utils/generarPDF.js';
import { enviarPDF } from '../utils/enviarCorreo.js';

const router = express.Router();

// ====================
// CREATE
// ====================
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, tipo, descripcion } = req.body;
    const result = await pool.query(
      `INSERT INTO solicitudes (nombre, correo, tipo, descripcion)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, correo, tipo, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al crear solicitud' });
  }
});

// ====================
// ENVIAR PDF
// ====================
router.post('/enviar', async (req, res) => {
  const { email } = req.body;
  console.log('Correo recibido:', email); // <-- aquí
  if (!email) return res.status(400).json({ ok: false, error: 'Correo requerido' });


  try {
    // Verificar que el destinatario exista
    const result = await pool.query(
      'SELECT nombre, cedula FROM destinatarios WHERE correo = $1',
      [email]
    );
    console.log('Resultado BD:', result.rows);


    if (result.rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'Destinatario no encontrado' });
    }

    const destinatario = result.rows[0];
    const data = {
      titulo: 'Reporte de Solicitudes',
      autor: 'Sistema',
      anio_publicacion: new Date().getFullYear()
    };

    // Crear PDF encriptado
    const archivoPDF = await createEncryptedPDFForRecipient(email, data);

    try {
      // Enviar PDF por correo
      await enviarPDF(email, archivoPDF);
    } catch (mailErr) {
      console.error('Error al enviar correo:', mailErr);
      return res.status(500).json({ ok: false, error: 'Error al enviar el correo: ' + mailErr.message });
    } finally {
      // Borrar archivo temporal
      deleteFile(archivoPDF);
    }

    res.json({ ok: true, msg: `PDF enviado a ${email}` });
  } catch (err) {
    console.error('Error en /enviar:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ====================
// READ ALL
// ====================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM solicitudes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al obtener solicitudes' });
  }
});

// ====================
// READ ONE
// ====================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM solicitudes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ ok: false, error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al obtener la solicitud' });
  }
});

// ====================
// UPDATE
// ====================
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, tipo, descripcion, estado } = req.body;

    const result = await pool.query(
      `UPDATE solicitudes
       SET nombre=$1, correo=$2, tipo=$3, descripcion=$4, estado=$5
       WHERE id=$6 RETURNING *`,
      [nombre, correo, tipo, descripcion, estado || 'pendiente', id]
    );

    if (result.rows.length === 0) return res.status(404).json({ ok: false, error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al actualizar' });
  }
});

// ====================
// DELETE
// ====================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM solicitudes WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ ok: false, error: 'No encontrado' });
    res.json({ ok: true, msg: 'Eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al eliminar' });
  }
});

export default router;
