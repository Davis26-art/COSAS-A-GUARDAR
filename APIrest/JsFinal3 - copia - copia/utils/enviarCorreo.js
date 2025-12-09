// enviarCorreo.js
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const enviarPDF = async (destino, archivoPDF) => {
  console.log('📧 Intentando enviar correo a:', destino);
  console.log('📎 Archivo adjunto:', archivoPDF);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Verificar conexión SMTP
  try {
    await transporter.verify();
    console.log('✅ Servidor SMTP listo para enviar correos');
  } catch (err) {
    console.error('❌ Error de conexión SMTP:', err);
    throw new Error('No se pudo conectar al servidor SMTP. Revisa tus credenciales.');
  }

  const mailOptions = {
    from: `"Solicitudes App" <${process.env.SMTP_USER}>`,
    to: destino,
    subject: 'Listado de Solicitudes',
    text: 'Adjunto encontrarás el PDF con el listado de solicitudes (protegido con contraseña).',
    attachments: [
      { filename: path.basename(archivoPDF), path: archivoPDF }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado correctamente a', destino);
    console.log('📨 Info del envío:', info.response);
  } catch (err) {
    console.error('❌ Error enviando correo:', err);
    throw new Error('No se pudo enviar el correo. Revisa tu SMTP o el archivo adjunto.');
  }
};
