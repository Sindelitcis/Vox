const Discord = require('discord.js');
const controller = require('../controller');
const { DELETE_MESSAGE_TIMEOUT_EXTRA_SHORT, DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const excluir = require('../functions/excluirVox');
const config = require('../functions/configVox');

module.exports.run = async (client, message, args) => {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  const servidor = await controller.servidores.getOne({ idDiscord: message.guild.id, desativado: { $exists: false } });
  if (servidor) {
    const msg = await message.channel.send('Resetando...')
    console.log('começou a excluir')
    await excluir(client, message, args, servidor);
    console.log('terminou de excluir')
    timer(500)
    //const servidor_ = await controller.servidores.getOne({idDiscord: message.guild.id});
    console.log('começou a configurar')
    await config(client, message, args, servidor, true);
    console.log('terminou de configurar')
    return {
      msg, delay: DELETE_MESSAGE_TIMEOUT_SHORT
    }
  }

}