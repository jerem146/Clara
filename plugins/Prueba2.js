import fs from 'fs';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return m.reply('《✧》Debes especificar el nombre de un anime.\nEjemplo:\n*#ainfo Takt Op.Destiny*.');
  }

  const query = text.trim().toLowerCase();

  let characters;
  try {
    const file = fs.readFileSync('./src/database/characters.json', 'utf-8');
    characters = JSON.parse(file);
  } catch (e) {
    console.error('[ERROR JSON]:', e);
    return m.reply('✧ No se pudo leer o parsear el archivo characters.json.\nVerifica que el archivo exista y sea válido.');
  }

  let users = {};
  try {
    const userFile = fs.readFileSync('./src/database/users.json', 'utf-8');
    users = JSON.parse(userFile);
  } catch (e) {
    console.warn('[users.json no encontrado o vacío, se usará uno nuevo]');
  }

  const list = characters.filter(c => c.source?.toLowerCase().includes(query));

  if (list.length === 0) {
    return m.reply(`✧ No se encontraron personajes relacionados con: ${text}`);
  }

  const grouped = {};
  for (let char of list) {
    if (!grouped[char.source]) grouped[char.source] = [];
    grouped[char.source].push(char);
  }

  const [animeName, chars] = Object.entries(grouped)[0];
  const total = chars.length;
  const claimed = chars.filter(c => c.status !== 'Libre').length;
  const percent = ((claimed / total) * 100).toFixed(0);

  let msg = `*❀ Nombre: \`${animeName}\`*\n\n`;
  msg += `❏ Personajes » *\`${total}\`*\n`;
  msg += `♡ Reclamados » *\`${claimed}/${total} (${percent}%)\`*\n`;
  msg += `❏ Lista de personajes:\n\n`;

  for (let c of chars) {
    if (c.status === 'Libre') {
      msg += `» *${c.name}* (${c.id}) • Libre.\n`;
    } else {
      let userName = 'Desconocido';
      if (c.user) {
        if (!users[c.user]) {
          try {
            users[c.user] = await conn.getName(c.user);
            fs.writeFileSync('./src/database/users.json', JSON.stringify(users, null, 2));
          } catch (e) {
            console.error('[ERROR getName]:', e);
          }
        }
        userName = users[c.user] || c.user;
      }
      msg += `» *${c.name}* (${c.id}) • Reclamado por ${userName}.\n`;
    }
  }

  msg += `\n> ⌦ _Página *1* de *1*_`;
  m.reply(msg);
};

handler.help = ['ainfo', 'animeinfo'];
handler.tags = ['gacha'];
handler.group = true;
handler.register = true
handler.command = ['ainfo', 'animeinfo']
export default handler;
