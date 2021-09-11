const Discord = require('discord.js');
const controller = require('../controller');
const { DELETE_MESSAGE_TIMEOUT_SHORT, LOG_VOX } = require('../constants');
const excluir = require('../functions/excluirVox');

module.exports.run = async (client, message, args) => {
  const servidor = await controller.servidores.getOne({idDiscord: message.guild.id, desativado: {$exists: false}});
  if(!servidor) {
    return message.reply('este servidor não está configurado. Digite `s+config` para começar!')
      .then(msg => msg.delete({timeout: DELETE_MESSAGE_TIMEOUT_SHORT}));
  }
  
  if(message.author.id !== message.guild.ownerID){
    return message.reply('apenas o dono do servidor pode fazer isso. :(').then(msg => msg.delete({timeout: DELETE_MESSAGE_TIMEOUT_SHORT }))
  }
  const replyMessage = await message.channel.send(`<@${message.author.id}> digite **confirmar** ou **cancelar**\n Isso apaga todos os cargos e salas do Vox, pense bem!`);

  setTimeout(()=>{
    if(replyMessage && !replyMessage.deleted){
      replyMessage.delete();
    }
  }, 10*1000);

  const filter = msg => msg.author.id == message.author.id &&( msg.content.toLowerCase() == 'confirmar' || msg.content.toLowerCase() == 'cancelar' );
  message.channel.awaitMessages(filter, {max: 1, time: 10*1000}).then(async collected => {
    if(replyMessage.deleted) return;
    if(collected.first().content.toLowerCase() === 'cancelar'){
      try{
        replyMessage.delete({ timeout: 150 });
      }catch(e){}
      return message
        .reply('obrigado por cancelar a operação!')
        .then(msg=>msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_SHORT }))
    }
    // A partir daqui, roda se confirmou em deletar
    if (!replyMessage || (replyMessage && replyMessage.deleted)) {
      return
    };
    if (!collected.first().deleted) {
      collected.first().delete();
    }

    try{
        replyMessage.delete({ timeout: 150 });
        message.channel.send("Excluindo...")
          .then((msg)=>{
            msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_SHORT })
          });
    }catch(e){}
    console.log('comecou a excluir')
    await excluir(client, message, args, servidor);
    console.log('excluiu tudo')
    const options = (items) => {
      return items.map(item=>item).join('\n');
    }
    client.channels.fetch(LOG_VOX).then(channel => {
      channel.send(options([
        `Excluído do servidor **${message.guild.name}**, ID: ${servidor.idDiscord}\n`,
        '\`Query ↓',
        `{ _id: ObjectId("${servidor._id}") }\`\n`,
        `Dono que fez a crueldade: **${message.author.tag}**, ID: ${message.author.id}`
      ]));
    });
    
  }).catch(async (e)=>{
    // Acaba o tempo

    message.reply("o tempo expirou, ficamos felizes em saber que reconsiderou! :D")
      .then(msg=>msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_SHORT }))
  });
}