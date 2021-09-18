const Discord = require('discord.js');
const Reaction = require('../functions/reactions/ReactClass');
const {menu, personagens} = require('../reactions');
const React = require('../react')
module.exports.run = async (client, message, args) => {
  const guildEmbed = await require('../embeds/guildaMembro')(client, message);
  const menuEmbed = require('../embeds/menu')(client, message);
  const reaction = await Reaction.config({ message, client })
    .initial({ embed: menuEmbed, reactions: Object.values(menu) })

  reaction.on(menu.personagens, { goTo: { embed: guildEmbed, reactions:  Object.values(personagens)} })
  reaction.on(personagens.criar, { goTo: { embed: menuEmbed, reactions: Object.values(menu) } })

}