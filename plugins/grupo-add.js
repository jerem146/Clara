let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'
  const cleanNumber = txt => txt.replace(/[^\d]/g, '')
  let user

  // Obtener número del texto o mensaje citado
  if (m.quoted) {
    user = m.quoted.sender
  } else if (text) {
    if (text.includes('+')) return conn.react(m.chat, '❌', m.key)
    if (isNaN(text)) return conn.react(m.chat, '❌', m.key)
    user = `${cleanNumber(text)}@s.whatsapp.net`
  } else {
    return conn.react(m.chat, '❌', m.key)
  }

  if (['add', 'agregar', 'añadir'].includes(command)) {
    const isInGroup = participants.some(p => p.id === user)
    if (isInGroup) return conn.react(m.chat, '⚠️', m.key)

    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'add')
      await conn.react(m.chat, '✅', m.key)
    } catch (e) {
      console.error(e)
      await conn.react(m.chat, '❌', m.key)
    }
  }

  if (['invitar', 'invite'].includes(command)) {
    try {
      const code = await conn.groupInviteCode(m.chat)
      const inviteLink = `https://chat.whatsapp.com/${code}`

      await conn.sendMessage(user, {
        text: `📩 *Has sido invitado al grupo por @${m.sender.split('@')[0]}*\n\n🔗 Enlace de invitación:\n${inviteLink}`,
        mentions: [m.sender]
      })

      await conn.react(m.chat, '✅', m.key)
    } catch (e) {
      console.error(e)
      await conn.react(m.chat, '❌', m.key)
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