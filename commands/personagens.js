const controller = require('../controller');
const Discord = require('discord.js');

//LISTAR OS PERSONAGENS
module.exports = async(client, message, args) => {
  const id = message.author.id;
  const conta = await controller.contas.getOne({idDiscord: id})
  const ids_dos_personagens_na_conta = conta.personagens; // [ObjectId(...), ....]
  const personagensDaConta = await controller.personagens.get(
    {
      _id: {
        $in: ids_dos_personagens_na_conta
      }
    }
  )

  const personagens = personagensDaConta.map(personagem=>{
    return personagem.nome + ' - ' + personagem.nivel
  })

  return (personagens.join(', '))

}