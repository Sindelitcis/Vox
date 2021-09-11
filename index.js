const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client(); 
const config = require("./config.json");
const controller = require('./controller');

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
      commandFile.run(client, message, args);
      try{
        await message.delete({timeout: 150})
      }catch(e){}
    } catch (err) {
        const comandos = require('./commands.json');
        if(comandos.map(c=>c.comandos).flat().includes(command)){
          const comando = comandos[comandos.findIndex(comando=>comando.comandos.includes(command))].arquivo;
          const commandFile = require(`./commands/${comando}.js`)
          commandFile.run(client, message, args);
          try{
            await message.delete({timeout: 150})
          }catch(e){}

        }else{
          message.reply(`digitou o corretamente? Não consegui executar "**${command}**".`).then(msg2 => msg2.delete({timeout: 3000}))
          console.error("Erro:" + err);
          try{
            await message.delete({timeout: 150})
          }catch(e){}
        }

    }
}
client.on("message", message => {
     execComando(message);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
     execComando(newMessage);
});

client.on("ready", () => {
  let activities = [
      `Use ${config.prefix}config para começar!`,
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
      }), 1000 * 60);  // WATCHING, LISTENING, PLAYING, STREAMING

  client.user
      .setStatus("dnd") // idle, dnd, online, invisible
      .catch(console.error);
console.log("Estou Online!")
});

client.on("message", async message => {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
 
  if (message.member.permissions.has("ADMINISTRATOR")) return;
//RegEx com as expressões que normalmente tem na maioria dos links de convites e suas variantes.
  if (regex.exec(message.content)) {
    await message.delete({timeout: 1000});
//Se o conteúdo da mensagem for um convite, o bot apagará a mensagem após um segundo.
      await message.channel.send(
        `${message.author} **você não pode postar link de outros servidores aqui! Para mais informações entre em contato com a moderação.**`
      );
  }
//Envia um aviso que ele não pode postar convites naquele chat.
});


client.login(process.env.discordToken); 
console.clear();