// telegram.js
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

// Instancia “inactiva”, no poll
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

// Función para enviar reportes desde cualquier parte
export const enviarTelegram = async (reporte) => {
  const CHAT_ID = '1550666615'; // tu chat ID
  const mensaje = `
📩 Nuevo reporte:
Nombre: ${reporte.nombre}
Asunto: ${reporte.asunto}
Mensaje: ${reporte.mensaje}
  `;
  await bot.sendMessage(CHAT_ID, mensaje);
};
