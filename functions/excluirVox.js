const { DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const controller = require('../controller');

module.exports = async (client, message, args, servidor) => {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function _delete(cache, array) {
    for (const msg of array) {
      try {
        console.log({msgId: msg.id})
        cache.get(msg.id).delete();
      } catch (e) {
        console.log(e)
      }
      await timer(100);
    }
  }
  if (!servidor) {
    return {
      msg: await message.reply({ content: 'servidor não encontrado' }),
      delay: DELETE_MESSAGE_TIMEOUT_SHORT
    };
  }
  console.log(message.guild.cache)
  await _delete(message.guild.channels.cache, servidor.canais);
  await _delete(message.guild.channels.cache, servidor.categorias);
  await _delete(message.guild.roles.cache, servidor.cargos);

  await controller.servidores.update({ idDiscord: message.guild.id }, { $set: { desativado: true }, $unset: { reativadoEm: 1 } });
};