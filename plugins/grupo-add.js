let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  const cleanNumber = txt => txt.replace(/[^\d]/g, '')

  let user

  // Obtener número del mensaje citado o texto
  if (m.quoted) {
    user = m.quoted.sender
  } else if (text) {
    if (text.includes('+')) return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el signo "+" ni espacios.*`, m)
    if (isNaN(text)) return conn.reply(m.chat, `${emoji2} *Ingrese solo números válidos.*`, m)
    user = `${cleanNumber(text)}@s.whatsapp.net`
  } else {
    return conn.reply(m.chat, `${emoji2} *Responda un mensaje o escriba el número del usuario.*`, m)
  }

  if (['add', 'agregar', 'añadir'].includes(command)) {
    // Verifica si ya está en el grupo
    const isInGroup = participants.some(p => p.id === user)
    if (isInGroup) return conn.reply(m.chat, `${emoji2} *El usuario ya está en el grupo.*`, m)

    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'add')
      m.reply(`${emoji} *Usuario agregado correctamente al grupo.*`)
    } catch (e) {
      console.error(e)
      conn.reply(m.chat, `${emoji2} *No se pudo agregar al usuario. Puede tener restricciones de privacidad o no usar WhatsApp.*`, m)
    }
  }

  if (['invitar', 'invite'].includes(command)) {
    try {
      const code = await conn.groupInviteCode(m.chat)
      const inviteLink = `https://chat.whatsapp.com/${code}`

      await conn.sendMessage(user, {
        text: `📩 *Has sido invitado al grupo por @${m.sender.split('@')[0]}*\n\n🔗 Enlace de invitación:\n${inviteLink}\n\n✨ ¡Te esperamos!`,
        mentions: [m.sender]
      })

      m.reply(`${emoji} *Invitación enviada a @${user.split('@')[0]}*`, null, {
        mentions: [user]
      })
    } catch (e) {
      console.error(e)
      conn.reply(m.chat, `${emoji2} *No se pudo enviar la invitación. Verifique si el número es válido y está en WhatsApp.*`, m)
    }
  }
}

handler.help = ['add <número o responder>', 'invite <número o responder>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invite', 'invitar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler