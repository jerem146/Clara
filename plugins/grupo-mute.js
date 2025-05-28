import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
  const isMuteCommand = command === "mute";
  const isUnmuteCommand = command === "unmute";

  if (!isAdmin) {
    throw "🍬 *Solo un administrador puede ejecutar este comando*";
  }

  const botOwner = global.owner[0][0] + "@s.whatsapp.net";
  if (m.mentionedJid && m.mentionedJid[0] === botOwner) {
    throw "🍬 *El creador del bot no puede ser mutado*";
  }

  const targetUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  if (!targetUser) {
    return conn.reply(m.chat, "🍬 *Menciona a la persona que deseas mutar/demutar*", m);
  }

  if (targetUser === conn.user.jid) {
    throw "🍭 *No puedes mutar/demutar el bot*";
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupOwner = groupMetadata.owner || m.chat.split`-`[0] + "@s.whatsapp.net";
  if (m.mentionedJid && m.mentionedJid[0] === groupOwner) {
    throw "🍭 *No puedes mutar el creador del grupo*";
  }

  if (targetUser === m.sender) {
    throw "🍬 *Sólo otro administrador puede desmutarte*";
  }

  let user = global.db.data.users[targetUser];

  if (isMuteCommand) {
    if (user.muto === true) {
      throw "🍭 *Este usuario ya ha sido mutado*";
    }

    const muteMessage = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      participant: "0@s.whatsapp.net"
    };

    conn.reply(m.chat, "*Tus mensajes serán eliminados*", muteMessage, null, {
      mentions: [targetUser]
    });
    global.db.data.users[targetUser].muto = true;
  } else if (isUnmuteCommand) {
    if (user.muto === false) {
      throw "🍭 *Este usuario no ha sido mutado*";
    }

    const unmuteMessage = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      participant: "0@s.whatsapp.net"
    };

    global.db.data.users[targetUser].muto = false;
    conn.reply(m.chat, "*Tus mensajes no serán eliminados*", unmuteMessage, null, {
      mentions: [targetUser]
    });
  }
};

handler.command = ['mute', 'unmute'];
handler.group = true;
handler.admin = true;

export default handler;
