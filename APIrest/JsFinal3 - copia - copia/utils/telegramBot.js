import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { pool } from '../db.js';
import { createEncryptedPDFForRecipient } from './generarPDF.js';
import { enviarPDF } from './enviarCorreo.js';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
console.log('🤖 Bot de Telegram iniciado...');

const chatStates = {};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();
  console.log(`Mensaje recibido de ${msg.chat.username || chatId}: "${text}"`);

  try {
    if (!text) return;

    // ===== Comandos directos primero =====
    if (text.startsWith('/pdf')) {
      const args = text.split(' ');
      if (!args[1]) {
        bot.sendMessage(chatId, '❌ Debes enviar un correo. Ejemplo: /pdf usuario@correo.com');
        return;
      }
      const correo = args[1];
      const resDest = await pool.query('SELECT * FROM destinatarios WHERE correo=$1', [correo]);
      if (resDest.rows.length === 0) {
        bot.sendMessage(chatId, `❌ No se encontró el destinatario: ${correo}`);
        return;
      }

      const pdfData = { titulo: 'Listado de solicitudes', autor: 'Sistema Telegram', anio_publicacion: new Date().getFullYear() };
      const pdfPath = await createEncryptedPDFForRecipient(correo, pdfData);
      await enviarPDF(correo, pdfPath);
      bot.sendMessage(chatId, `✅ PDF generado y enviado a ${correo}`);
      return;
    }

    if (text === '/listar') {
      const resSoli = await pool.query('SELECT * FROM solicitudes ORDER BY id ASC');
      const solicitudes = resSoli.rows;
      if (solicitudes.length === 0) {
        bot.sendMessage(chatId, '📄 No hay solicitudes registradas.');
      } else {
        let msgListado = '📄 Listado de solicitudes:\n\n';
        solicitudes.forEach((s, i) => {
          msgListado += `${i + 1}. ${s.nombre} | ${s.tipo} | ${s.estado || 'pendiente'}\n   Correo: ${s.correo}\n   Descripción: ${s.descripcion}\n\n`;
        });
        bot.sendMessage(chatId, msgListado);
      }
      return;
    }

    // ===== Flujo interactivo /nueva =====
    const state = chatStates[chatId];

    if (state?.step) {
      switch (state.step) {
        case 'elegirAccion':
          if (text === '1') {
            chatStates[chatId] = { step: 'nuevoDestinatario' };
            bot.sendMessage(chatId, 'Ingresa: nombre correo tipo descripcion');
          } else if (text === '2') {
            const res = await pool.query('SELECT nombre FROM destinatarios ORDER BY nombre ASC');
            if (res.rows.length === 0) {
              bot.sendMessage(chatId, '❌ No hay destinatarios existentes. Debes agregar uno primero.');
              delete chatStates[chatId];
              return;
            }
            chatStates[chatId] = { step: 'seleccionarDestinatario', nombres: res.rows.map(r => r.nombre) };
            bot.sendMessage(chatId, `Selecciona el destinatario escribiendo su nombre:\n${res.rows.map(r => r.nombre).join('\n')}`);
          } else {
            bot.sendMessage(chatId, 'Opción inválida. Responde 1 o 2');
          }
          return;

        case 'nuevoDestinatario':
          const args = text.split(' ');
          if (args.length < 4) {
            bot.sendMessage(chatId, 'Formato incorrecto. Usa: nombre correo tipo descripcion');
            return;
          }
          const [nombre, correo, tipo, ...desc] = args;
          const descripcion = desc.join(' ');

          await pool.query('INSERT INTO destinatarios (nombre, correo) VALUES ($1, $2)', [nombre, correo]);
          await pool.query('INSERT INTO solicitudes (nombre, correo, tipo, descripcion, estado) VALUES ($1,$2,$3,$4,$5)',
            [nombre, correo, tipo, descripcion, 'pendiente']);

          bot.sendMessage(chatId, `✅ Destinatario y solicitud agregados: ${nombre}`);
          delete chatStates[chatId];
          return;

        case 'seleccionarDestinatario':
          if (!state.nombres.includes(text)) {
            bot.sendMessage(chatId, 'Nombre inválido. Intenta de nuevo');
            return;
          }
          chatStates[chatId] = { step: 'agregarSolicitud', nombre: text };
          bot.sendMessage(chatId, 'Ingresa: tipo descripcion');
          return;

        case 'agregarSolicitud':
          const [tipo2, ...desc2] = text.split(' ');
          const descripcion2 = desc2.join(' ');

          const correoRes = await pool.query('SELECT correo FROM destinatarios WHERE nombre=$1', [state.nombre]);
          const correo2 = correoRes.rows[0].correo;

          await pool.query('INSERT INTO solicitudes (nombre, correo, tipo, descripcion, estado) VALUES ($1,$2,$3,$4,$5)',
            [state.nombre, correo2, tipo2, descripcion2, 'pendiente']);

          bot.sendMessage(chatId, `✅ Solicitud agregada para ${state.nombre}`);
          delete chatStates[chatId];
          return;
      }
    }

    // ===== Comando inicial /nueva =====
    if (text === '/nueva') {
      chatStates[chatId] = { step: 'elegirAccion' };
      bot.sendMessage(chatId, 'Selecciona la acción:\n1️⃣ Nuevo destinatario + solicitud\n2️⃣ Nueva solicitud para existente');
      return;
    }

    // ===== Comando no reconocido =====
    bot.sendMessage(chatId, 'Comando no reconocido.\nUsa:\n/pdf correo@ejemplo.com\n/listar\n/nueva');

  } catch (err) {
    console.error('Error en bot:', err);
    bot.sendMessage(chatId, `❌ Ocurrió un error: ${err.message}`);
  }
});

export default bot;
