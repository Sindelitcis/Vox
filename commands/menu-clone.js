const Discord = require('discord.js');
const ReactionFlow = require('../functions/reactions/ReactClass');
const React = require('../react')
// module.exports.run = async (client, message, args) => {
//   const menuEmbed = await require('../embeds/guildaMembro')(client, message);
//   await ReactionFlow(client).initial(menuEmbed, { reactions: ['🥒', '😎'] })
//   const user = message.author;
//   const name = `『📝』𝑴𝑬𝑵𝙐-${user.id}`
//   if (message.guild.channels.cache.find(ch => ch.name === name)) {
//     const msg = message.channel.send({ content: "Seu menu já está aberto!" });
//     return { msg, delay: 3000 }
    
//   } else {
    
//     const guild = message.guild;
//     const channels = guild.channels;
//     const msg = await channels.create(name).then(async (chan) => {
//       chan.permissionOverwrites.create(chan.guild.roles.everyone, {
//         SEND_MESSAGES: false,
//         VIEW_CHANNEL: false
//       })
//       chan.permissionOverwrites.create(user.id, {
//         SEND_MESSAGES: true,
//         VIEW_CHANNEL: true
//       });

//       message.channel.send({ content: "**Menu aberto no topo da lista de canais!**" })
//         .then(msg => msg.delete({ timeout: 3500 }));

//       // const reactions = require('../reactions')
//       // const sent_embed = await message.channel.send({embeds: [menuEmbed]});
//       const menuEmbedReal = require('../embeds/menu')(client, message);

//       // const menuReact = require('../functions/reactions/menu')(client, message, menuEmbed);
//       // const personagensReact = require('../functions/reactions/personagens')(client, message);


//       return {
//         msg, delay: 3000
//       }
//     }
//   }
// }