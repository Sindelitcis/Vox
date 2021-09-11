const { DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const Conta = require('../controllers/conta');
const Personagem = require('../controllers/personagem');

module.exports.run = async (client, message, args) => {
  // const conta = await controller.contas.getOne({idDiscord: message.author.id});
  // const personagem = await controller.personagens.getOne({_id: conta.personagemAtivo});
  const conta = await Conta.getByDiscordID(message.author.id);
  const personagem = await Personagem.getActive(conta);

  const msg = await message.reply(`você está nível [**${personagem.nivel}**]`);
  msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_SHORT })
}