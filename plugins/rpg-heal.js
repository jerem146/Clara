let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
    return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n> Un *administrador* puede activarlos con el comando » *#economy on*`)
  }
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, `${emoji} El usuario no se encuentra en la base de Datos.`, m);
    }
    if (user.coin < 50) {
        return conn.reply(m.chat, `💔 Su saldó fue insuficiente para curarte. Necesitas al menos 20.`, m);
    }
    let healAmount = 50; 
    user.health += healAmount;
    user.coin -= 50; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();
    let info = `❤️ *Te has curado ${healAmount} puntos de salud.*\n💸 *${moneda} restantes:* ${user.coin}\n❤️ *Salud actual:* ${user.health}`;
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar']
handler.group = true;
handler.register = false;

export default handler;