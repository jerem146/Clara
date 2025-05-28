let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono) 
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
return conn.reply(m.chat, `${emoji} *Elija una opción para configurar el grupo*\n\nEjemplo:\n*✰ #open*\n*✰ #close*`, m)
await conn.groupSettingUpdate(m.chat, isClose)

if (isClose === 'not_announcement'){
m.reply(`${emoji} *Ya pueden escribir en este grupo.*`)
}

if (isClose === 'announcement'){
m.reply(`${emoji2} *Solos los admins pueden escribir en este grupo.*`)
}}
handler.help = ['open', 'close']
handler.tags = ['grupo']
handler.command = ['open', 'close']
handler.admin = true

export default handler
