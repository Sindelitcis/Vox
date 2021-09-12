const controller = require('../controller');
const Discord = require('discord.js');
const { CONFIG } = require('../constants');
const config = require('../functions/configVox');
 

module.exports.run = async(client, message, args) => {
  const idDiscord = message.guild.id;
  const servidor = await controller.servidores.getOne({idDiscord, desativado: {$exists: false}});
  //console.log({server: servidor.idDiscord})
  await config(client, message, args, servidor);

}