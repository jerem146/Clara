let handler = async (m, { conn, args, command }) => {
  const isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
  }[(command || '')];

  if (isClose === undefined) {
    return conn.reply(m.chat, `*Uso:*\n*#open / #close*`, m);
  }

  try {
    await conn.groupSettingUpdate(m.chat, isClose);
    if (command === 'open') {} 
    else if (command === 'close') {
    }
  } catch (error) {
    console.error(error);
    m.reply(`Hubo un error al cambiar la configuración del grupo.`);
  }
};

handler.help = ['open', 'close'];
handler.tags = ['group'];
handler.command = ['open', 'close'];
handler.admin = true;

export default handler;
