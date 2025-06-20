import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

let dev = '𝐂𝐋𝐀𝐑𝐀 | 𝐁𝐎𝐓'; // Nombre del bot
let fkontak = {
  key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
  message: {
    contactMessage: {
      displayName: 'Sistema Clara',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Clara\nTEL;type=CELL;waid=0\nEND:VCARD`,
    },
  },
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let pp;
  try {
    pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image');
  } catch (error) {
    console.error("Error al obtener la foto de perfil:", error);
    pp = 'https://files.catbox.moe/xr2m6u.jpg';
  }

  let img = await (await fetch(pp)).buffer();
  let chat = global.db.data.chats[m.chat];
  let taguser = `@${m.messageStubParameters[0].split('@')[0]}`;
  let groupSize = participants.length;

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    groupSize++;
  } else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) {
    groupSize--;
  }

  let welcomeMessage = global.welcom1 || '¡Disfruta tu estadía!';
  let byeMessage = global.welcom2 || '¡Esperamos verte pronto!';

  if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = `┏╼★ ${dev}
┋「 Bienvenido 」
┗╼★ 「 ${taguser} 」
 ┋❖ ${welcomeMessage}
 ┋❀ Grupo: ${groupMetadata.subject}
 ┋❀ Miembros: ${groupSize}
 ┗━━━━━━━━━━━━━━━┅ ⳹
> ✐ Usa *#help* para ver los comandos.`;

    await conn.sendMini(m.chat, 'ゲ◜៹ New Member ៹◞ゲ', dev, bienvenida, img, img, fkontak);
  }

  if (
    chat?.welcome &&
    (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE)
  ) {
    let despedida = `┏╼★ ${dev}
┋「 ADIÓS 👋 」
┗╼★ 「 ${taguser} 」
 ┋❖ ${byeMessage}
 ┋❀ Grupo: ${groupMetadata.subject}
 ┋❀ Miembros: ${groupSize}
 ┗━━━━━━━━━━━━━━━┅ ⳹
> © ${dev}`;

    await conn.sendMini(m.chat, 'ゲ◜៹ Bye Member ៹◞ゲ', dev, despedida, img, img, fkontak);
  }

  return true;
}
