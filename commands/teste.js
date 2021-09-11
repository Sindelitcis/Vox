const Discord = require('discord.js');
//const embedMenu = require('../embeds/menu')


exports.run = async(client, message, args) => {
  const embedMenu = require('../embeds/menu')(client, message)

  message.reply(embedMenu)
}
//exports.run = (client, message, args) => {
    // if (!cooldown.has(message.author.id)) {
    // cooldown.add(message.author.id);
    // const prefixo = config.prefixo;
    // const embed = new Discord.MessageEmbed()
    // .setAuthor(`Minha lista de comandos, ${message.author.username}.`, client.user.avatarURL())
    // .setDescription(`\`⚒️ Comandos de moderação.\`\n\`🎧 Comandos de música.\`\n\`🥳 Comandos de diversão.\`\n\`🎖️ Comandos variados.\`\n\`💵 Comandos de economia/level.\`.`)
    // .setColor("#36393F")
    // message.author.send(embed).then(msg => {
    //     message.react("📬");
    //     msg.react(`⚒️`);
    //     msg.react('🎧');
    //     msg.react('🥳')
    //     msg.react('🎖️');
    //     msg.react('💵');

    //     let filtro = (reaction, user) => reaction.emoji.name == "⚒️" && user.id == message.author.id;
    //     let filtro2 = (reaction, user) => reaction.emoji.name == "🎧" && user.id == message.author.id;
    //     let filtro3 = (reaction, user) => reaction.emoji.name == "🥳" && user.id == message.author.id;
    //     let filtro4 = (reaction, user) => reaction.emoji.name == "🎖️" && user.id == message.author.id;
    //     let filtro5 = (reaction, user) => reaction.emoji.name == "💵" && user.id == message.author.id;

    //     let coletor = msg.createReactionCollector(filtro);
    //     let coletor2 = msg.createReactionCollector(filtro2);
    //     let coletor3 = msg.createReactionCollector(filtro3);
    //     let coletor4 = msg.createReactionCollector(filtro4);
    //     let coletor5 = msg.createReactionCollector(filtro5);

    //     coletor.on('collect', () => {
    //         const embed1 = new Discord.MessageEmbed()
    //         .setAuthor(`⚒️ Comandos de moderação`, message.author.avatarURL())
    //         .setDescription(`\`${prefixo}ban [Usuário] [Motivo]\n${prefixo} mute [Usuário] [Tempo] [Motivo]\``)
    //         .setColor("#36393F");
    //         msg.edit(embed1);
    //         msg.react('⬅️');

    //         let filtroback = (reaction, user) => reaction.emoji.name == "⬅️" && user.id == message.author.id;
    //         let coletorback = msg.createReactionCollector(filtroback);
    //         coletorback.on('collect', () => {
    //             msg.edit(embed);
    //         });
    //     });

    //     coletor2.on('collect', () => {
    //         const embed1 = new Discord.MessageEmbed()
    //         .setAuthor(`🎧 Comandos de música`, message.author.avatarURL())
    //         .setDescription(`\`${prefixo}play [nome da música]\n${prefixo}skip\n${prefixo}fila\n${prefixo}stop\``)
    //         .setColor("#36393F");
    //         msg.edit(embed1);
    //         msg.react('⬅️');

    //         let filtroback = (reaction, user) => reaction.emoji.name == "⬅️" && user.id == message.author.id;
    //         let coletorback = msg.createReactionCollector(filtroback);
    //         coletorback.on('collect', () => {
    //             msg.edit(embed);
    //         });
    //     });

    //     coletor3.on('collect', () => {
    //         const embed1 = new Discord.MessageEmbed()
    //         .setAuthor(`Comandos de `, message.author.avatarURL())
    //         .setDescription(`\` \``)
    //         .setColor("#36393F");
    //         msg.edit(embed1);
    //         msg.react('⬅️');

    //         let filtroback = (reaction, user) => reaction.emoji.name == "⬅️" && user.id == message.author.id;
    //         let coletorback = msg.createReactionCollector(filtroback);
    //         coletorback.on('collect', () => {
    //             msg.edit(embed);
    //         });
    //     });

    //     coletor4.on('collect', () => {
    //         const embed1 = new Discord.MessageEmbed()
    //         .setAuthor(`Comandos de `, message.author.avatarURL())
    //         .setDescription(`\` \``)
    //         .setColor("#36393F");
    //         msg.edit(embed1);
    //         msg.react('⬅️');

    //         let filtroback = (reaction, user) => reaction.emoji.name == "⬅️" && user.id == message.author.id;
    //         let coletorback = msg.createReactionCollector(filtroback);
    //         coletorback.on('collect', () => {
    //             msg.edit(embed);
    //         });
    //     });

    //     coletor5.on('collect', () => {
    //         const embed1 = new Discord.MessageEmbed()
    //         .setAuthor(`Comandos de `, message.author.avatarURL())
    //         .setDescription(`\` \``)
    //         .setColor("#36393F");
    //         msg.edit(embed1);
    //         msg.react('⬅️');

    //         let filtroback = (reaction, user) => reaction.emoji.name == "⬅️" && user.id == message.author.id;
    //         let coletorback = msg.createReactionCollector(filtroback);
    //         coletorback.on('collect', () => {
    //             msg.edit(embed);
    //         });
    //     });

        
    // }).catch(e => {
    //     message.channel.send(`Não enviei a mensagem porque suas mensagens privadas estão desativadas, ative-as e tente novamente, ${message.author}.`)
    // });
    // setTimeout(() => {
    //     cooldown.delete(message.author.id);
    //     }, 5000)
    // } else {
    //     message.reply('Aguarde 5 segundos antes de executar esse comando novamente.');
    // }
//    message.reply(embedMenu)
//}; 
// const reactions = [
//   {
//     emoji: '',
//     embed: '',
//   }
// ]
