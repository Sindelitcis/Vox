const controller = require('../controller');
const { DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const config = require('../functions/configVox');


module.exports.run = async (client, message, args) => {
  const idDiscord = message.guild.id;
  message.channel.send('Configurando...').then(msg => msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_SHORT }));
  const servidor = await controller.servidores.getOne({ idDiscord, desativado: { $exists: false } });
  await config(client, message, args, servidor);

}