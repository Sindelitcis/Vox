const Discord = require("discord.js");
const { DELETE_MESSAGE_TIMEOUT_SHORT, DELETE_MESSAGE_TIMEOUT_MEDIUM } = require("../constants");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return {
      msg: await message.reply({ content: "lhe falta permissão de `Gerenciar Mensagens` para usar esse comando" }),
      delay: DELETE_MESSAGE_TIMEOUT_SHORT
    }
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return {
      msg: await message.reply({ content: "forneça um número de até **99 mensagens** a serem excluídas" }),
      delay: DELETE_MESSAGE_TIMEOUT_SHORT
    }
    try {
    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1
    });
    await message.channel.bulkDelete(fetched);
    return {
      msg: await message.channel.send({ content: `**${args[0]} mensagens limpas nesse chat!**` }),
      delay: DELETE_MESSAGE_TIMEOUT_SHORT
    }
  } catch (error) {
    console.log(`Não foi possível deletar mensagens devido a: ${error}`)
  }
};