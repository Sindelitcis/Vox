const Discord = require('discord.js')
const React = require('../react')
module.exports.run = async (client,message,args) =>{
const menuEmbed = await require('../embeds/guildaMembro')(client, message);
  const user = message.author;
  const name = `『📝』𝑴𝑬𝑵𝙐-${user.id}`
  if(message.guild.channels.cache.find(ch => ch.name === name)){
    message.channel.send("Seu menu já está aberto!").then(msg=>msg.delete({timeout: 3000}));
    
  }else{

    const guild = message.guild;
    const channels = guild.channels;
    channels.create(name).then((chan)=>{
      chan.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      })
      chan.updateOverwrite(user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
      });

      message.channel.send("**Menu aberto no topo da lista de canais!**")
      .then(msg => msg.delete({timeout: 3500}));

      const reactions = require('../reactions')

      React(message, chan, menuEmbed, reactions.menu, async(emoji)=>{
        switch(emoji){
          case reactions.menu.personagens:
            const personagemClick = require('../functions/personagemClick')
            personagemClick(client, chan, message)
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
      })
      const {MENU_TIMEOUT} = require('../constants')
      setTimeout(()=>{
          chan.delete()
      }, MENU_TIMEOUT) // fecha em 1 min
    })
  }

}