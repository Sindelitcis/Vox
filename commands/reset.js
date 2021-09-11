const Discord = require('discord.js');
const controller = require('../controller');
const { DELETE_MESSAGE_TIMEOUT_EXTRA_SHORT  } = require('../constants');
const excluir = require('../functions/excluirVox');
const config = require('../functions/configVox');

module.exports.run = async (client, message, args) => {
  
  const servidor = await controller.servidores.getOne({idDiscord: message.guild.id, desativado: {$exists: false}});
  if(servidor){
    console.log('começou a excluir')
    await excluir(client, message, args, servidor);
    console.log('terminou de excluir')
    const servidor_ = await controller.servidores.getOne({idDiscord: message.guild.id});
    console.log('começou a configurar')
    await config(client, message, args, servidor_);
    console.log('terminou de configurar')
  }

}