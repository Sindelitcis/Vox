const Discord = require('discord.js')

const react = (message, channel, embed, reactions, onReact) => {
  
  return channel.send(embed).then(msg=>{
    Object.values(reactions).forEach(reaction=>{
      msg.react(reaction)
    })

    let filtro = (reaction, user) => (
      Object.values(reactions)
      .includes(reaction.emoji.name) && user.id == message.author.id
    )

    let coletor = msg.createReactionCollector(filtro);

    coletor.on('collect', (reaction, user) => {
      onReact(reaction.emoji.name)
      reaction.users.remove(user);
    })
  });

}

module.exports = react;
