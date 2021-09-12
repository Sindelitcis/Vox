const controller = require('../controller');
const Discord = require('discord.js');
const { DELETE_MESSAGE_TIMEOUT_SHORT } = require('../constants');
const Conta = require('../controllers/conta');
const Personagem = require('../controllers/personagem');

module.exports.run = async (client, message, args) => {
  const conta = await Conta.getByDiscordID(message.author.id)
  const personagem = await Personagem.getActive(conta)
  return {
    msg: await message.reply({ content: `você possui ${personagem.saldo}g` }),
    delay: DELETE_MESSAGE_TIMEOUT_SHORT
  }
}