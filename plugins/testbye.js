import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  const chat = global.db.data.chats[m.chat];
  const dev = '𝐂𝐋𝐀𝐑𝐀';

  const estilo = {
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

  if (!chat?.welcome) {
    return m.reply('✎ Las bienvenidas están desactivadas.\nUsa *#welcome* para activarlas.');
  }

  if (!text) {
    return m.reply('✎ Debes mencionar a alguien.\nEjemplo: *#testbye @usuario*');
  }

  const who = conn.parseMention(text)[0];
  if (!who) {
    return m.reply('✎ Mención no válida. Asegúrate de etiquetar a un usuario real.');
  }

  const taguser = `@${who.split('@')[0]}`;
  const groupMetadata = await conn.groupMetadata(m.chat);
  const defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  // Obtener foto de perfil del usuario
  let pp;
  try {
    pp = await conn.profilePictureUrl(who, 'image');
  } catch (e) {
    console.log('❌ No se pudo obtener la foto de perfil:', e);
    pp = defaultImage;
  }

  let img;
  try {
    img = await (await fetch(pp)).buffer();
  } catch {
    img = await (await fetch(defaultImage)).buffer();
  }

  const byeMessage = chat.byeMessage || '❍ Edita con el comando #setbye';
  const groupSize = groupMetadata.participants.length;

  const mensaje = `╭───────────────➤
│ ✯ ${dev}
│ 「 Adiós 」
│ ★ ${taguser}
│ ${byeMessage}
│ ❁ Grupo: ${groupMetadata.subject}
│ ❁ Miembros: ${groupSize}
╰─────────────────⌲
✎ Esperamos verte pronto.`;

  await conn.sendMessage(
    m.chat,
    {
      image: img,
      caption: mensaje,
      mentions: [who],
    },
    { quoted: estilo }
  );
};

handler.help = ['testbye @usuario'];
handler.tags = ['group'];
handler.command = ['testbye'];
handler.admin = true;
handler.group = true;

export default handler;