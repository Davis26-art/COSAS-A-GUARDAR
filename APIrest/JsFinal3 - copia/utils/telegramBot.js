import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { pool } from '../db.js';
import { createEncryptedPDFForRecipient } from './generarPDF.js';
import { enviarPDF } from './enviarCorreo.js';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
console.log('🤖 Bot de Telegram iniciado...');

const chatStates = {};

// =====================
// UTILIDADES
// =====================
const resetState = (chatId) => {
  delete chatStates[chatId];
};

// =====================
// COMANDOS DIRECTOS
// =====================
const handlePdf = async (chatId, text) => {
  const args = text.trim().split(' ');

  if (!args[1]) {
    return bot.sendMessage(chatId, '❌ Debes enviar un correo. Ejemplo: /pdf usuario@correo.com');
  }

  const correo = args[1].toLowerCase();

  const res = await pool.query(
    'SELECT 1 FROM destinatarios WHERE correo=$1',
    [correo]
  );

  if (res.rows.length === 0) {
    return bot.sendMessage(chatId, `❌ No se encontró el destinatario: ${correo}`);
  }

  const pdfData = {
    titulo: 'Listado de solicitudes',
    autor: 'Sistema Telegram',
    anio_publicacion: new Date().getFullYear()
  };

  const pdfPath = await createEncryptedPDFForRecipient(correo, pdfData);
  await enviarPDF(correo, pdfPath);

  return bot.sendMessage(chatId, `✅ PDF generado y enviado a ${correo}`);
};

const handleListar = async (chatId) => {
  const res = await pool.query('SELECT * FROM solicitudes ORDER BY id ASC');
  const solicitudes = res.rows;

  if (solicitudes.length === 0) {
    return bot.sendMessage(chatId, '📄 No hay solicitudes registradas.');
  }

  let msg = '📄 Listado de solicitudes:\n\n';

  solicitudes.forEach((s, i) => {
    msg += `${i + 1}. ${s.nombre} | ${s.tipo}\n`;
    msg += `   Correo: ${s.correo}\n`;
    msg += `   Descripción: ${s.descripcion}\n\n`;
  });

  return bot.sendMessage(chatId, msg);
};

// =====================
// FLUJOS /nueva
// =====================
const handleNuevaFlow = async (chatId, text, state) => {
  switch (state.step) {
    case 'elegirAccion':

      if (text === '1') {
        chatStates[chatId] = { step: 'nuevoDestinatario' };
        return bot.sendMessage(chatId, 'Ingresa: nombre correo cedula');
      }

      if (text === '2') {
        const res = await pool.query(
          'SELECT nombre FROM destinatarios ORDER BY nombre ASC'
        );

        if (res.rows.length === 0) {
          resetState(chatId);
          return bot.sendMessage(chatId, '❌ No hay destinatarios. Primero crea uno.');
        }

        chatStates[chatId] = {
          step: 'seleccionarDestinatario',
          nombres: res.rows.map(r => r.nombre)
        };

        return bot.sendMessage(
          chatId,
          `Selecciona el destinatario escribiendo su nombre:\n${chatStates[chatId].nombres.join('\n')}`
        );
      }

      return bot.sendMessage(chatId, 'Opción inválida. Responde 1 o 2');

    case 'nuevoDestinatario': {
      const args = text.trim().split(' ');

      if (args.length < 3) {
        return bot.sendMessage(chatId, '❌ Formato incorrecto. Usa: nombre correo cedula');
      }

      const [nombre, correo, cedula] = args;

      const existe = await pool.query(
        'SELECT 1 FROM destinatarios WHERE correo=$1 OR cedula=$2',
        [correo, cedula]
      );

      if (existe.rows.length > 0) {
        return bot.sendMessage(chatId, '❌ Ya existe un destinatario con ese correo o cédula.');
      }

      await pool.query(
        'INSERT INTO destinatarios (nombre, correo, cedula) VALUES ($1,$2,$3)',
        [nombre, correo, cedula]
      );

      resetState(chatId);
      return bot.sendMessage(chatId, `✅ Destinatario creado: ${nombre}`);
    }

    case 'seleccionarDestinatario':

      if (!state.nombres.includes(text)) {
        return bot.sendMessage(chatId, '❌ Nombre inválido. Escribe uno de la lista.');
      }

      chatStates[chatId] = { step: 'agregarSolicitud', nombre: text };
      return bot.sendMessage(chatId, 'Ingresa: tipo descripcion');

    case 'agregarSolicitud': {
      const partes = text.trim().split(' ');
      const tipo = partes[0];
      const descripcion = partes.slice(1).join(' ');

      if (!descripcion) {
        return bot.sendMessage(chatId, '❌ Debes escribir una descripción.');
      }

      const correoRes = await pool.query(
        'SELECT correo FROM destinatarios WHERE nombre=$1',
        [state.nombre]
      );

      if (correoRes.rows.length === 0) {
        resetState(chatId);
        return bot.sendMessage(chatId, '❌ No se encontró el destinatario.');
      }

      const correo = correoRes.rows[0].correo;

      await pool.query(
        'INSERT INTO solicitudes (nombre, correo, tipo, descripcion) VALUES ($1,$2,$3,$4)',
        [state.nombre, correo, tipo, descripcion]
      );

      resetState(chatId);
      return bot.sendMessage(chatId, `✅ Solicitud agregada para ${state.nombre}`);
    }
  }
};

// =====================
// HANDLER PRINCIPAL
// =====================
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  try {

    const state = chatStates[chatId];

    // Comandos directos
    if (text.startsWith('/pdf')) return await handlePdf(chatId, text);
    if (text === '/listar') return await handleListar(chatId);

    // Iniciar flujo
    if (text === '/nueva') {
      chatStates[chatId] = { step: 'elegirAccion' };
      return bot.sendMessage(
        chatId,
        'Selecciona la acción:\n1️⃣ Nuevo destinatario\n2️⃣ Nueva solicitud para destinatario existente'
      );
    }

    // Continuar flujo activo
    if (state?.step) {
      return await handleNuevaFlow(chatId, text, state);
    }

    // Fallback
    return bot.sendMessage(
      chatId,
      'Comando no reconocido.\nUsa:\n/pdf correo@ejemplo.com\n/listar\n/nueva'
    );

  } catch (err) {
    console.error('❌ Error en bot:', err);
    bot.sendMessage(chatId, `❌ Ocurrió un error: ${err.message}`);
  }
});

export default bot;
