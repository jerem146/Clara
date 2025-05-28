const { Client, GroupChat } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this QR code with your WhatsApp mobile app
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body === '!open') {
        if (msg.from.endsWith('@g.us')) {
            try {
                let chat = await msg.getChat();

                if (chat.isGroup) {
                    await chat.setGroupSettingsOpen();
                    msg.reply('Grupo abierto!');
                } else {
                    msg.reply('Este comando solo puede ser usado en grupos.');
                }
            } catch (error) {
                console.error('Error al abrir el grupo:', error);
                msg.reply('Ocurrió un error al intentar abrir el grupo.');
            }
        } else {
            msg.reply('Este comando solo puede ser usado en grupos.');
        }

    } else if (msg.body === '!close') {
        if (msg.from.endsWith('@g.us')) {
            try {
                let chat = await msg.getChat();
            
            if (chat.isGroup) {
                await chat.setGroupSettingsClose();
                msg.reply('Grupo cerrado!');
            } else {
                msg.reply('Este comando solo puede ser usado en grupos.');
            }
            } catch (error) {
                console.error('Error al cerrar el grupo:', error);
                msg.reply('Ocurrió un error al intentar cerrar el grupo.');
            }
        } else {
            msg.reply('Este comando solo puede ser usado en grupos.');
        }
    }
});

client.initialize();
