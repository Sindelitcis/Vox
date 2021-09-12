const { DELETE_MESSAGE_TIMEOUT_SHORT, DELETE_MESSAGE_TIMEOUT_LONG, DELETE_MESSAGE_TIMEOUT_INSTA } = require('../constants');
const Conta = require('../controllers/conta');
const Personagem = require('../controllers/personagem');

module.exports.run = async (client, message, args) => {
  
  const conta = await Conta.getByDiscordID(message.author.id);
  const personagem = await Personagem.getActive(conta);

  return {
    msg: await message.reply({ content: `você está nível [**${personagem.nivel}**]` }),
    delay: DELETE_MESSAGE_TIMEOUT_SHORT
  }
}