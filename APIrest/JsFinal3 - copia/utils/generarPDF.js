// generarPDF.js
import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
import { pool } from '../db.js';

const TEMP_DIR = path.join(process.cwd(), 'temp_pdfs');

function ensureTempDir() {
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);
}

export async function createEncryptedPDFForRecipient(correo, data) {
    ensureTempDir();

    // ✅ Obtener destinatario
    const resDest = await pool.query('SELECT * FROM destinatarios WHERE correo=$1', [correo]);
    if (resDest.rows.length === 0) throw new Error('Destinatario no encontrado');
    const destinatario = resDest.rows[0];

    const password = destinatario.cedula;

    console.log('Destinatario encontrado:', destinatario);
    console.log('Contraseña para PDF:', password);

    // ✅ Obtener solicitudes
    const resSoli = await pool.query('SELECT * FROM solicitudes ORDER BY id ASC');
    const solicitudes = resSoli.rows;
    console.log('Solicitudes a incluir en el PDF:', solicitudes);

    // ✅ Definir ruta del PDF
    const filePath = path.join(TEMP_DIR, `reporte_${destinatario.nombre.replace(/\s/g, '_')}.pdf`);
    console.log('Ruta del archivo PDF a generar:', filePath);

    // ✅ Generar PDF y retornar la ruta
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ 
            size: 'A4', margin: 50,
            info: { Title: `Reporte para ${destinatario.nombre}`, Author: data.autor || 'Sistema' },
            userPassword: password,
            permissions: { modifying: false, annotating: false }
        });

        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Encabezado
        doc.font('Helvetica-Bold').fontSize(26).text(`Reporte Oficial`, { align: 'center' });
        doc.fontSize(18).text(`Destinatario: ${destinatario.nombre}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).font('Helvetica').text(`Título: ${data.titulo}`);
        doc.text(`Autor: ${data.autor}`);
        doc.text(`Año: ${data.anio_publicacion}`);
        doc.moveDown(1);

        // Listado de solicitudes
        doc.font('Helvetica-Bold').fontSize(16).text('📄 Solicitudes Registradas:', { underline: true });
        doc.moveDown(0.5);

        if (solicitudes.length === 0) {
            doc.font('Helvetica-Oblique').fontSize(12).text('No hay solicitudes registradas.');
        } else {
            solicitudes.forEach((s, i) => {
                doc.font('Helvetica-Bold').fontSize(12).text(`${i + 1}. ${s.nombre} | ${s.tipo} | ${s.estado || 'pendiente'}`);
                doc.font('Helvetica').fontSize(12).text(`   Correo: ${s.correo}`);
                doc.text(`   Descripción: ${s.descripcion}`);
                doc.moveDown(0.5);
            });
        }

        doc.moveDown(1);
        doc.font('Helvetica-Oblique').fontSize(12).text(`Este documento está encriptado. Contraseña: ${password}`, { align: 'center' });

        doc.end();

        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', (err) => reject(err));
    });
}

// Función opcional para eliminar PDF temporal
export function deleteFile(filePath) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
