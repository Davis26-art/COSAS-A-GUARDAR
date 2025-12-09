import dotenv from 'dotenv';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { pool } from './db.js';
import reportesRoutes from './routes/reportes.js';

dotenv.config();
const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Limpiar updates pendientes
const limpiarUpdates = async () => {
  try {
    const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getUpdates`);
    const data = await res.json();
    if (data.result.length > 0) {
      const offset = data.result[data.result.length - 1].update_id + 1;
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
      console.log(`✅ Updates pendientes limpiados`);
    }
  } catch (err) {
    console.error('Error limpiando updates:', err.message);
  }
};

// Función para iniciar bot y server
const iniciar = async () => {
  await limpiarUpdates();

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const texto = msg.text?.toLowerCase();

    if (texto === '/start') {
      bot.sendMessage(chatId, 'Bienvenido. Usa "listar" para ver los reportes.');
    }

    if (texto === 'listar') {
      try {
        const result = await pool.query('SELECT id, nombre, asunto, fecha FROM reportes ORDER BY id DESC');
        if (result.rows.length === 0) {
          bot.sendMessage(chatId, 'No hay reportes registrados.');
          return;
        }

        let respuesta = '📄 Reportes:\n\n';
        result.rows.forEach(r => {
          respuesta += `#${r.id} | ${r.nombre} | ${r.asunto} | ${r.fecha}\n`;
        });

        bot.sendMessage(chatId, respuesta);
      } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'Error consultando la base de datos.');
      }
    }
  });

  // Rutas API
  app.use('/api/reportes', reportesRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor + Bot Telegram iniciados en http://localhost:${PORT}`);
  });
};

iniciar();
