import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const enviarCorreo = async (reporte) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: reporte.correo,
    subject: `Reporte recibido: ${reporte.asunto}`,
    text: `Hola ${reporte.nombre},\n\nHemos recibido tu reporte:\n\n${reporte.mensaje}`,
  });
};
