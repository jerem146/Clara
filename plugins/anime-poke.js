//Codígo creado por Destroy wa.me/584120346669 
//Código Actualizado por https wa.me/573154062343

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('👉');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *picó a* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *picó a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se picó a sí mismo.*`.trim();
    }
    
    if (m.isGroup) { 
        let pp = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251682426.mp4';
        let pp2 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251669794.mp4';
        let pp3 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251696303.mp4';
        let pp4 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251700690.mp4';
        let pp5 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251711304.mp4';
        let pp6 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251717098.mp4';
        let pp7 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251720953.mp4';
        let pp8 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747251752997.mp4';
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['poke/picar @tag'];
handler.tags = ['anime'];
handler.command = ['poke','picar'];
handler.group = true;

export default handler;
