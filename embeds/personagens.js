const Discord = require('discord.js')
const {REACTIONS} = require('../constants');
const reactions = REACTIONS.personagens
const options = (items) => {
  return items.map(item=>'`'+item+'`').join('\n')
}
const embed = (client, message) => new Discord.MessageEmbed()
    .setAuthor(`Escolha a opção desejada, ${message.author.username}.`, message.author.avatarURL())
    .setColor('#f08315')
    .setDescription(
      options([
        `${reactions.listar} Veja seus personagens criados.`,
        `${reactions.criar} Crie um novo personagem.`,
        `${reactions.deletar} Exclua um personagem.`,
      ])
    )
    .setColor("#36393F")
  

module.exports = embed;