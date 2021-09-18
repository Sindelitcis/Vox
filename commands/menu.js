const Discord = require('discord.js')
const React = require('../react')
module.exports.run = async (client, message, args) => {
  const menuEmbed = await require('../embeds/guildaMembro')(client, message);
  const user = message.author;
  const name = `『📝』𝑴𝑬𝑵𝙐-${user.id}`
  if (message.guild.channels.cache.find(ch => ch.name === name)) {
    const msg = message.channel.send({ content: "Seu menu já está aberto!" });
    return { msg, delay: 3000 }

  } else {

    const guild = message.guild;
    const channels = guild.channels;
    const msg = await channels.create(name).then((chan) => {
      chan.permissionOverwrites.create(chan.guild.roles.everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      })
      chan.permissionOverwrites.create(user.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });

      message.channel.send({ content: "**Menu aberto no topo da lista de canais!**" })
        .then(msg => msg.delete({ timeout: 3500 }));

      const reactions = require('../reactions')

      return React(client, message, menuEmbed, reactions.menu, async (emoji, author) => {
        //console.log({emoji, author: author.username})
        switch (emoji) {
          case reactions.menu.personagens:
            console.log('clicou na mascarinha');

            break;

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
      }, true)
      const { MENU_TIMEOUT } = require('../constants')
      // fecha em 1 min
    })
    return {
      msg, delay: 3000
    }
  }

}