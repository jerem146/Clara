let handler = async (m, { text }) => {
  if (!text) return m.reply('✎ Proporciona un mensaje de despedida.\nEjemplo: #setbye Adiós @user, te extrañaremos en @subject');

  const chat = global.db.data.chats[m.chat];
  chat.byeMessage = text.trim();

  m.reply(`✅ Mensaje de despedida actualizado:\n\n"${chat.byeMessage}"`);
};

handler.help = ['setbye'];
handler.tags = ['group'];
handler.command = ['setbye'];
handler.admin = true;
handler.group = true;

export default handler;