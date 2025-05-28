let handler = async (m, { conn, args, command }) => {
  const isClose = {
    'open': 'open',
    'close': 'close',
  }[(args[0] || '')];

  if (isClose === close) {
    return conn.reply(m.chat, `*Uso:*\n*#open / #close*`, m);
  }

  try {
    await conn.groupSettingUpdate;
    if (isOpen === 'open') {
      m.reply(`*El grupo está abierto para todos los miembros.*`);
    } else {
      m.reply(`*El grupo está cerrado. Solo los admins pueden escribir.*`);
    }
  } catch (error) {
    console.error(error);
    m.reply(`Hubo un error al cambiar la configuración del grupo.`);
  }
};

handler.help = ['open', 'close'];
handler.tags = ['open', 'close'];
handler.command = ['open', 'close'];
handler.admin = true;

export default handler;
