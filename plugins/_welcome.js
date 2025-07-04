import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

let dev = '𝐂𝐋𝐀𝐑𝐀';
let estilo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
  },
  message: {
    contactMessage: {
      displayName: 'Sistema Clara',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Clara\nTEL;type=CELL;waid=0\nEND:VCARD`,
    },
  },
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const who = m.messageStubParameters[0];
  const taguser = `@${who.split('@')[0]}`;
  const chat = global.db.data.chats[m.chat] || {};
  const defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  let img;
  try {
    const pp = await conn.profilePictureUrl(who, 'image');
    img = await (await fetch(pp)).buffer();
  } catch {
    img = await (await fetch(defaultImage)).buffer();
  }

  let groupSize = participants.length;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++;
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) groupSize--;

  // ✅ Aquí usamos los mensajes personalizados por grupo
  const welcomeMessage = chat.welcomeMessage || '❍ Edita con el comando #setwelcome';
  const byeMessage = chat.byeMessage || '❍ Edita con el comando #setbye';

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const bienvenida = `╭───────────────➤
│ ✯ ${dev}
│ 「 Bienvenido 」
│ ★ ${taguser}
│ ${welcomeMessage}
│ ❁ Grupo: ${groupMetadata.subject}
│ ❁ Miembros: ${groupSize}
╰─────────────────⌲
✎ Usa *#help* para ver los comandos.`;

    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: bienvenida,
        mentions: [who],
      },
      { quoted: estilo }
    );
  }

  if (
    chat.welcome &&
    (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE)
  ) {
    const despedida = `╭───────────────➤
│ ✯ ${dev}
│ 「 Adiós 👋 」
│ ★ ${taguser}
│ ${byeMessage}
│ ❁ Grupo: ${groupMetadata.subject}
│ ❁ Miembros: ${groupSize}
╰─────────────────⌲
© ${dev}`;

    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: despedida,
        mentions: [who],
      },
      { quoted: estilo }
    );
  }

  return true;
}