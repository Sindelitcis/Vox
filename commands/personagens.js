const Personagem = require('../controllers/personagem');

//LISTAR OS PERSONAGENS
module.exports.run = async (client, message, args) => {
  const id = message.author.id;
  const personagens = await Personagem.getByUser(id)
  return message.reply(personagens.map(Personagem.info).join(', '));

}