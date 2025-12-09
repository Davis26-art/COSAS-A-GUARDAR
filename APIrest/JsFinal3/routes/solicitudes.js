// routes/solicitudes.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
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
    res.status(500).json({ error: 'Error al crear solicitud' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM solicitudes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM solicitudes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la solicitud' });
  }
});

// UPDATE
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

    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM solicitudes WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

export default router;
