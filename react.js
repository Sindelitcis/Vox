const Discord = require('discord.js')

const react = async (client, message, embed, reactions, onReacted, root) => {

  const msg = root ? await message.channel.create({ embeds: [embed] }) : await message.channel.create({ embeds: [embed] });
  Promise.all(Object.values(reactions).map(reaction => msg.react(reaction)))

  client.on('messageReactionAdd', async (interaction, user) => {
    if(user.bot) return
    const author = user;
    const reactedEmoji = interaction._emoji.name;
    await onReacted(reactedEmoji, author);
  });
}


module.exports = react;
