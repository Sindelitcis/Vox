const React = require('../../react');
const embed = require('../../embeds/guildaMembro');
const reactions = require('../../reactions');

module.exports = async (client, message, initialEmbed) => {
    const menuEmbedReal = embed(client, message);
    await React(client, initialEmbed, reactions.personagens, async (emoji, changeEmbed) => {
        switch (emoji) {
            case reactions.menu.personagens:
                console.log('clicou na mascarinha');
                await changeEmbed(require('./personagens')(client, message));

            case reactions.saldo:
                console.log('clicou no saldo')

                break;

            case reactions.inventario:
                console.log('arco')

                break;

            case reactions.deslogar:
                console.log('clicou no deslogar')

                break;

            case reactions.dataDeCriacao:
                console.log('clicou na data de criação')

                break;

            default:
                console.log('clicou em fechar')

                break;
        }

    });
    return menuEmbedReal;
}