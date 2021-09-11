const { DELETE_MESSAGE_TIMEOUT_MEDIUM } = require('../constants');
const Personagem = require('../controllers/personagem');

//LISTAR OS PERSONAGENS
module.exports.run = async (client, message, args) => {
  const id = message.author.id;
  const _personagens = await Personagem.getByUser(id)
  const personagens = await Promise.all(_personagens.map(Personagem.info));
  return message.reply(personagens.join(', ')).then(msg => msg.delete({timeout: DELETE_MESSAGE_TIMEOUT_MEDIUM}));

}