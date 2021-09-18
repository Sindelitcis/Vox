const React = require('../react');
const controller = require('../controller');
module.exports = async(client,channel,message) =>{
  const persoEmbed = require('../embeds/personagens')(client, message);
  const { REACTIONS } = require('../constants');
  const reactions = REACTIONS.personagens;
  React(client, message, persoEmbed, reactions, async(emoji)=>{
    switch(emoji){
      case reactions.listar:
        const personagens = await personagensDaConta(message)
        if(!personagens){
          return msg.edit({content: 'Conta não encontrada'});
        }else{
          return msg.edit({content: personagens.length ? personagens : "Você ainda não possui nenhum personagem"});
        }
      break;
      case reactions.criar:
        const classesPrimarias = await controller.classes.get({primaria: true})
        return client.channels.cache.get(channel.id).send({content: JSON.stringify(classesPrimarias)});
      break;
      case reactions.deletar:

      break;
    }
  })
  const personagensDaConta = async(message) => {
    const id = message.author.id;
    const conta = await controller.contas.getOne({idDiscord: id})
    if(!conta) return null;
    const ids_dos_personagens_na_conta = conta.personagens; // [ObjectId(...), ....]
    const personagensDaConta = await controller.personagens.get(
      {
        _id: {
          $in: ids_dos_personagens_na_conta
        }
      }
    )
    const personagens = personagensDaConta.map(personagem=>{
      return personagem.nome + ' - ' + personagem.nivel;
    })
    return personagens;
  }
  
}

