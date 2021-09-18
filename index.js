require('dotenv').config()
const express = require('express');
const app = express();
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES',
    'DIRECT_MESSAGES'
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],

});
client.commands = new Collection()
const config = require("./config.json");
const { DELETE_MESSAGE_TIMEOUT_INSTA, DELETE_MESSAGE_TIMEOUT_TINY, DELETE_MESSAGE_TIMEOUT_SHORT } = require('./constants');

app.get("/", async (req, res) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  res.sendStatus(200);
});

app.listen(3000);

const execComando = async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)
    const { msg, delay } = await commandFile.run(client, message, args);
    setTimeout(() => {
      if (msg && !msg.deleted && msg.delete)
        try {
          msg.delete();
        } catch (e) {
          console.error(e);
        }
      if (message && !message.deleted && message.delete)
        try {
          message.delete();
        }
        catch (e) {
          console.error(e);
        }
    }, delay)
    //await message.delete({ timeout: 150 })
  } catch (err) {
    const comandos = require('./commands.json');
    if (comandos.map(c => c.comandos).flat().includes(command)) {
      try {
        const comando = comandos[comandos.findIndex(comando => comando.comandos.includes(command))].arquivo;
        const commandFile = require(`./commands/${comando}.js`)
        const { msg, delay } = await commandFile.run(client, message, args);
        setTimeout(() => {
          msg.delete();
          message.delete();
        }, delay)
        //await message.delete({ timeout: 150 })
      } catch (e) { console.error(e) }

    } else {
      console.log({ err })
      // message.reply({content: `digitou o corretamente? Não consegui executar "**${command}**".`})
      //   .then(msg2 => {
      //     setTimeout(() => {
      //       msg2.delete();
      //       message.delete();
      //     }, DELETE_MESSAGE_TIMEOUT_SHORT)
      //   })
      //console.error("Erro:" + err);
    }

  }
}
client.on("messageCreate", async (message) => {
  execComando(message)
})
client.on("messageUpdate", (oldMessage, newMessage) => {
  execComando(newMessage);
});

client.on("ready", () => {
  let activities = [
    `Use ${config.prefix}config para começar!`,
  ],
    i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "PLAYING"
  }), 1000 * 60);  // WATCHING, LISTENING, PLAYING, STREAMING

  client.user
    .setStatus("dnd") // idle, dnd, online, invisible
  //.catch(console.error);
  console.log("Estou Online!")
});

// client.on("message", async message => {
//   execComando(message);
//   const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

//   if (message.member.permissions.has("ADMINISTRATOR")) return;
//   //RegEx com as expressões que normalmente tem na maioria dos links de convites e suas variantes.
//   if (regex.exec(message.content)) {
//     await message.delete({ timeout: 1000 });
//     //Se o conteúdo da mensagem for um convite, o bot apagará a mensagem após um segundo.
//     await message.channel.send(
//       `${message.author} **você não pode postar link de outros servidores aqui! Para mais informações entre em contato com a moderação.**`
//     );
//   }
//   //Envia um aviso que ele não pode postar convites naquele chat.
// });


client.login(process.env.discordToken);