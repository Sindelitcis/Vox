const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "lhe falta permissão de `Gerenciar Mensagens` para usar esse comando"
    );
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply(
      "forneça um número de até **99 mensagens** a serem excluídas"
    );

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  try{
    await message.channel.bulkDelete(fetched);
    const msg = await message.channel.send(`**${args[0]} mensagens limpas nesse chat!**`)
    msg.delete({timeout: 3000})
  }catch(error){
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
  }
};