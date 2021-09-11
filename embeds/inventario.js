const Discord = require('discord.js')

const embed = (client, message) => {
  let filtro = (reaction, user) => reaction.emoji.name == "⚒️" && user.id == message.author.id;
  let coletor = msg.createReactionCollector(filtro);
  
  return new Discord.MessageEmbed()
    .setAuthor(`Escolha a opção desejada, ${message.author.username}.`, message.author.avatarURL())
    .setColor('#f08315')
    .setDescription(`\`⚒️ Lista de Personagens.\`\n\`💰 Saldo.\`\n\`🥳 Inventário.\`\n\`🎖️ Deslogar.\``)
    .setColor("#36393F")


    }
    module.exports = embed;