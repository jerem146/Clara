let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  const cleanNumber = txt => txt.replace(/[^\d]/g, '')
  let user

  // Obtener número del texto o respuesta
  if (m.quoted) {
    user = m.quoted.sender
  } else if (text) {
    if (text.includes('+')) return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el signo "+" ni espacios.*`, m)
    if (isNaN(text)) return conn.reply(m.chat, `${emoji2} *Ingrese solo números válidos.*`, m)
    user = `${cleanNumber(text)}@s.whatsapp.net`
  } else {
    return conn.reply(m.chat, `${emoji2} *Responda un mensaje o escriba el número al que quiere invitar.*`, m)
  }

  try {
    let group = m.chat
    let code = await conn.groupInviteCode(group)
    let link = 'https://chat.whatsapp.com/' + code

    await conn.sendMessage(user, {
      text: `📩 *Has sido invitado a un grupo por @${m.sender.split('@')[0]}*\n\n🔗 Enlace de invitación:\n${link}\n\n✨ ¡Esperamos que te unas!`,
      mentions: [m.sender]
    })

    m.reply(`${emoji} *Invitación enviada a @${user.split('@')[0]}*`, null, {
      mentions: [user]
    })
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `${emoji2} *No se pudo enviar la invitación. Verifica si el número está en WhatsApp.*`, m)
  }
}

handler.help = ['invite <número>']
handler.tags = ['group']
handler.command = ['invite', 'invitar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler