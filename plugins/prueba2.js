const handler = async (m, { conn, participants }) => {
    try {
        if (!m.isGroup) return;

        const groupId = m.chat;
        const botNumber = conn.user.jid;

        const groupAdmins = participants.filter(p => p.admin);

        if (!groupAdmins.find(p => p.id === botNumber)?.admin) {
            return m.reply('❌ El bot necesita ser administrador para usar esta función');
        }
        conn.on('group-participants-update', async (update) => {
            if (update.action === 'demote') {
                const revokedAdmin = update.participants[0];
                const revokingAdmin = update.actor;

                if (!revokedAdmin || !revokingAdmin) return;

                try {
                    await conn.groupParticipantsUpdate(groupId, [revokedAdmin], "promote");

                    await conn.groupParticipantsUpdate(groupId, [revokingAdmin], "demote");

                    await conn.sendMessage(groupId, {
                        text: `🛡️ Sistema de Protección Activado\n\n✅ Admin restaurado: @${revokedAdmin.split('@')[0]}\n❌ Admin removido: @${revokingAdmin.split('@')[0]}`,
                        mentions: [revokedAdmin, revokingAdmin]
                    });

                } catch (error) {
                    console.error('Error al gestionar cambios de admin:', error);
                    await conn.sendMessage(groupId, {
                        text: '❌ Error al procesar cambios de administrador'
                    });
                }
            }
        });

    } catch (error) {
        console.error('Error en plugin de protección:', error);
        m.reply('❌ Ocurrió un error al ejecutar el plugin');
    }
}

handler.help = ['adminprotect'];
handler.tags = ['group', 'admin'];
handler.command = ['adminprotect', 'protectadmin'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
