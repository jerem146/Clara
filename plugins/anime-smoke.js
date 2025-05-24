//Codígo creado por Destroy wa.me/584120346669
//Actualizado por https wa.me/573154062343

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
    m.react('🚬');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *está fumando con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está fumando con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está fumando*.`.trim();
    }

    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240652032.mp4'; 
        let pp2 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240642418.mp4'; 
        let pp3 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240636607.mp4';
        let pp4 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240629666.mp4';
        let pp5 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240623976.mp4';
        let pp6 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240610105.mp4';
        let pp7 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240584743.mp4';
        let pp8 = 'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240566327.mp4';
        let pp9 =
'https://raw.githubusercontent.com/https0J/Hoshino-Adiciones/main/Contenido/1747240560788.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['smoke/fumar @tag'];
handler.tags = ['anime'];
handler.command = ['smoke', 'fumar'];
handler.group = true;

export default handler;