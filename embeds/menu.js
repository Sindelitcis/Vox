const Discord = require('discord.js')
const {MENU_TIMEOUT} = require('../constants')
const embed = (client, message) => {
  const reactions = require('../reactions').menu
  const _embed = new Discord.MessageEmbed()
    .setAuthor(`Escolha a opção desejada, ${message.author.username}.`, message.author.avatarURL())
    .setColor('#f08315')
    .setDescription(`\`${reactions.personagens} Personagens.\`\n\`${reactions.saldo} Saldo.\`\n\`${reactions.inventario} Inventário.\`\n\`${reactions.deslogar} Deslogar.\`\n\`${reactions.dataDeCriacao} Data de criação.\`\n\`${reactions.fechar} Fechar Menu.\``)
    .setFooter(`O Menu fechará automaticamente em ${MENU_TIMEOUT/(60*1000)} minutos.`, "https://cdn.discordapp.com/attachments/876306889678393405/876343932945072128/219d27f8ab27aa509eeadd3c6e6956c6.gif");

  return _embed
}

module.exports = embed;