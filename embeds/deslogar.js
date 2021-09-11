const Discord = require('discord.js')

const embed = (client, message) => new Discord.MessageEmbed()
    .setAuthor(`Escolha a opção desejada, ${message.author.username}.`, message.author.avatarURL())
    .setColor('#f08315')
    .setDescription(`\`⚒️ Lista de Personagens\`\n\`�💰����� CSaldo🎖️ Comandos variados.\`\n\`💵 Comandos de economia/level.\`.`)
    .setColor("#36393F")

module.exports = embed;