let handler = async (m, { conn, text, isAdmin, isROwner, isBotAdmin, args }) => {
  if (!text) {
    return m.reply('✎ Por favor, proporciona un mensaje de bienvenida.\n\nEjemplo:\n#setwelcome Hola @user, bienvenido a @subject.');
  }

  let chat = global.db.data.chats[m.chat];
  chat.welcomeMessage = text.trim();

  m.reply(`✅ Mensaje de bienvenida actualizado correctamente:\n\n"${chat.welcomeMessage}"`);
};

handler.help = ['setwelcome'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true;

export default handler;