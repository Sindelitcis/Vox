const controller = require('../controller');
const Discord = require('discord.js');
const { DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');

module.exports.run = async(client, message, args) => {
  const conta = await controller.contas.getOne({idDiscord: message.author.id});
  const personagem = await controller.personagens.getOne({_id: conta.personagemAtivo});
  message.reply(`você possui ${personagem.saldo}g`).then(msg => msg.delete({timeout: DELETE_MESSAGE_TIMEOUT_SHORT}))
}