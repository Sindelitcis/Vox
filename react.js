const Discord = require('discord.js')

const react = async (client, embed, reactions, onReacted, root) => {

  //const msg = await old_embed.edit({ embeds: [new_embed] });
  Promise.all(Object.values(reactions).map(reaction => embed.react(reaction)))

  client.on('messageReactionAdd', async (interaction, user) => {
    if (user.bot) return
    const author = user;
    const reactedEmoji = interaction._emoji.name;
    Promise.resolve(embed.reactions.removeAll())
    await onReacted(reactedEmoji, async(new_embed)=>{
      const new_sent_embed = await embed.edit({ embeds: [new_embed] });
      
      return new_sent_embed;

    }, author);
  });
}


module.exports = react;
