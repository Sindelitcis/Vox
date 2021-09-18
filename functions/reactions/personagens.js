const React = require('../../react');
const embed = require('../../embeds/menu');
const reactions = require('../../reactions');

module.exports = async (client, message) => {
    const menuEmbedReal = embed(client, message);
    await React(client, changedEmbed, reactions.personagens, async (emoji, changeEmbed) => {
        switch (emoji) {
            case reactions.personagens.listar:
                await changeEmbed(menuEmbedReal);

                break;
        }

    });
    return menuEmbedReal;
}