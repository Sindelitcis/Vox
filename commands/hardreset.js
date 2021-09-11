module.exports.run = async(client ,message, args) =>{
  
  const ID_CHANNEL_BOAS_VINDAS = '883579418910531645';
  const ID_ROLE_GAME_MASTER = '883579085715034112';
  const ID_ROLE_VOX = '876165662219845695';
  const ID_ROLE_EVERYONE = '876161266345979925';
  const GRAND_FANTASIA_SERVER_ID = '876161266345979925';
  const PROJECT_SERVER_ID = '779565967470100512';

  if(message.guild.id !== GRAND_FANTASIA_SERVER_ID){
    message.reply('TÁ MALUCO??').then(msg => msg.delete({timeout: 3000}))
    return;
  }
  
  if(message.guild.id === PROJECT_SERVER_ID){
    message.reply('TÁ MALUCO?? QUASE QUE FOI EM!').then(msg => msg.delete({timeout: 10000}))
    return;
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function _delete(cache, array) {
    for (var i = 0; i < array.length; i++) {
      const item = array[i];
      try{
        cache.get(item).delete();
      } catch(e) {}
        await timer(100);
      }
  }
  const channels = message.guild.channels.cache
    .map(x => x)
    .filter(x => ![ID_CHANNEL_BOAS_VINDAS].includes(x.id))
    .map(ch => ch.id);

  const roles = message.guild.roles.cache
    .map(x => x)
    .filter(x => ![ID_ROLE_GAME_MASTER, ID_ROLE_VOX, ID_ROLE_EVERYONE]
      .includes(x.id)
    )
    .map(role => role.id);
  await console.log("Começou a excluir.")
  await _delete(message.guild.roles.cache, roles);
  await _delete(message.guild.channels.cache, channels);
  await console.log("Concluído.")
}