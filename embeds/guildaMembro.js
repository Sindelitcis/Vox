const Discord = require('discord.js')
const { GUILDAS, REACTIONS, GIF } = require('../constants');
const moment = require('moment')
const controller = require('../controller.js')

const embed = async(client, message) => {
  const usuario = await controller.contas.getOne({idDiscord: message.author.id});
  const guilda = await controller.guildas.getOne({_id:usuario.guilda});
  const guildaCount = await controller.contas.count({guilda: guilda._id});
  const lider = await controller.contas.getOne({_id: guilda.lider});
  const perfil_dc_lider = await client.users.fetch(lider.idDiscord);

  const options = (items) => {
    return items.map(item=>'`'+item+'`').join('\n');
  }

  const criadoEm = moment(new Date(guilda.criadoEm)).format('DD/MM/YYYY');
  const GUILDA_LEVEL = GUILDAS[`LEVEL_${guilda.nivel}`];
  
  return new Discord.MessageEmbed()
    .setAuthor(`| ${guilda.nome}`, perfil_dc_lider.avatarURL())
    .setColor(guilda.cor)
    .setThumbnail(guilda.logo)
    .setDescription(`Líder: **${perfil_dc_lider.tag}**\n`, options([
      `Membros: ${guildaCount}/${guilda.tamanho}`,
      `Ouro: ${guilda.banco}g`,
      `Nível: ${guilda.nivel} [${guilda.xp}/${GUILDA_LEVEL.xp}]`,
      `Imposto: 💰 ${guilda.imposto.gold.toFixed(2)}% ⛏️ ${guilda.imposto.xp.toFixed(2)}%`,
      `Bonus: ${GUILDA_LEVEL.bonus.length ? GUILDA_LEVEL.bonus.join(', ') : 'Nenhum'}`
    ]), `\n_**${guilda.lema}**_`)
    .setFooter(`Criado em: ${criadoEm}`);

}

module.exports = embed;