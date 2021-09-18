const Discord = require('discord.js');
const controller = require('../controller');
const { DELETE_MESSAGE_TIMEOUT_EXTRA_SHORT, DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const excluir = require('../functions/excluirVox');
const config = require('../functions/configVox');

module.exports.run = async (client, message, args) => {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  console.log({guild: message.guildId})
  const servidor = await controller.servidores.getOne({ idDiscord: message.guildId, $or:[
    {desativado: { $exists: false }},
    {desativado: false}
  ]});
  const msg = await message.channel.send({content: 'Resetando...'})
  console.log(servidor)
  if (servidor) {
    console.log('começou a excluir')
    try {
      console.log(14)
      await excluir(client, message, args, servidor);
      console.log(15)
    } catch (error) {
      console.error(error)
    }
    console.log('terminou de excluir')
    await timer(500)
    //const servidor_ = await controller.servidores.getOne({idDiscord: message.guild.id});
    console.log('começou a configurar')
    await config(client, message, args, servidor, true);
    console.log('terminou de configurar')
  }
  return {
    msg, delay: DELETE_MESSAGE_TIMEOUT_SHORT
  }

}