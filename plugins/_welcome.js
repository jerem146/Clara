import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

// Asegúrate de que estas variables estén definidas en un scope accesible
let dev = '𝐃𝐞𝐬𝐭𝐢𝐧𝐲-𝐛𝐨𝐭';// poner el nombre de tu bot
let fkontak = {
  key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
  message: { contactMessage: { displayName: 'Contacto Falso', vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${'Contacto Falso'}\nTEL;type=CELL;waid=0\nEND:VCARD` } }
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;
  let pp;
  try {
    pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');
  } catch (error) {
    console.error("Error al obtener la foto de perfil:", error);
    pp = 'https://files.catbox.moe/xr2m6u.jpg';
  }
  let img = await (await fetch(pp)).buffer();
  let chat = global.db.data.chats[m.chat];
  let txt = 'ゲ◜៹ New Member ៹◞ゲ';
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ';
  let groupSize = participants.length;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    groupSize++;
  } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    groupSize--;
  }

  if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split('@')[0]}\n${global.welcom1 || '¡Bienvenido al grupo!'}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
    try {
      await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, fkontak);
    } catch (error) {
      console.error("Error al enviar el mensaje de bienvenida:", error);
    }
  }

  if (chat?.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
    let bye = `❀ *Adiós* de ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split('@')[0]}\n${global.welcom2 || '¡Adiós! Esperamos verte pronto.'}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
    try {
      await conn.sendMini(m.chat, txt1, dev, bye, img, img, fkontak);
    } catch (error) {
      console.error("Error al enviar el mensaje de despedida:", error);
    }
  }
  return true;
}
