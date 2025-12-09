import PDFDocument from 'pdfkit';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const generarPDF = (reporte) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      userPassword: process.env.PDF_PASSWORD,
      ownerPassword: process.env.PDF_PASSWORD,
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
      },
    });

    const filePath = `reporte_${reporte.id}.pdf`;
    const file = fs.createWriteStream(filePath);
    doc.pipe(file);

    doc.fontSize(18).text('📄 Reporte generado', { align: 'center' });
    doc.moveDown();
    doc.text(`ID: ${reporte.id}`);
    doc.text(`Nombre: ${reporte.nombre}`);
    doc.text(`Correo: ${reporte.correo}`);
    doc.text(`Asunto: ${reporte.asunto}`);
    doc.text(`Mensaje: ${reporte.mensaje}`);
    doc.text(`Fecha: ${reporte.fecha}`);

    doc.end();
    file.on('finish', () => resolve(filePath));
  });
};
