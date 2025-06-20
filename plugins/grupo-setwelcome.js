let handler = async (m, { text }) => {
  if (!text) return m.reply('✎ Proporciona un mensaje de bienvenida.\nEjemplo: #setwelcome Hola @user, bienvenido a @subject');

  const chat = global.db.data.chats[m.chat];
  chat.welcomeMessage = text.trim();

  m.reply(`✅ Mensaje de bienvenida actualizado:\n\n"${chat.welcomeMessage}"`);
};

handler.help = ['setwelcome'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.group = true;

export default handler;