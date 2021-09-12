const Discord = require('discord.js');
const { DELETE_MESSAGE_TIMEOUT_MEDIUM, DELETE_MESSAGE_TIMEOUT_LONG } = require('../constants');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const Conta = require('../controllers/conta');
const Guilda = require('../controllers/guilda');
const Personagem = require('../controllers/personagem');
const Regiao = require('../controllers/regiao');


module.exports.run = async (client, message, args) => {
  const idDiscord = message.author.id;
  const usuario = await Conta.getByDiscordID(idDiscord);
  let guilda = null;
  let usuariosDaGuilda = null;
  let personagem = null;
  try {
    if (!usuario) {
      throw "Você não tem uma conta.";
    }
    guilda = await Guilda.get(usuario.guilda);

    if (!guilda) {
      throw 'Você não possui uma guilda.';
    }
    usuariosDaGuilda = await Guilda.getUsers(usuario.guilda);

    if (!usuariosDaGuilda.length) {
      throw "Esta guilda está vazia.";
    }
    personagem = await Personagem.getActive(usuario);

    if (!personagem) {
      throw "Você não tem nenhum personagem ativo.";
    }
  } catch (error) {
    return {
      msg: await message.reply({ content: error }),
      delay: DELETE_MESSAGE_TIMEOUT_MEDIUM
    }
  }
  const mapa = await Regiao.get(personagem.regiao);

  const coordenadas = mapa.posicao;
  const imgDir = path.join(__dirname, '../src/mapa.png');

  const canvas = createCanvas(526, 640)
  const ctx = canvas.getContext('2d')


  const mapaImg = loadImage(imgDir).then(async (image) => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    drawBall({
      cor: 'rgba(256,0,0,0.8)',
      posicao: coordenadas,
      tamanho: 5
    });

    if (guilda) {
      const lider = await Conta.get(guilda.lider);
      const personagemLider = await Personagem.getActive(lider);
      const regiaoLider = await Regiao.get(personagemLider && personagemLider.regiao || '');
      for (const usuarioNaGuilda of usuariosDaGuilda) {
        if (usuarioNaGuilda._id.toString() != guilda.lider.toString() && usuarioNaGuilda.idDiscord !== message.author.id) {
          drawBall({
            cor: 'rgba(0,0,256,0.5)',
            posicao: coordenadas,
            tamanho: 10
          });
        }
      }
      if (message.author.id !== lider.idDiscord && regiaoLider) {
        drawBall({
          cor: 'rgba(255,165,0,0.8)',
          posicao: regiaoLider.posicao,
          tamanho: 7
        });
      }
    }
    const sfattach = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');
    return sfattach;
  })
  const msg = await message.reply({ files: [await mapaImg] });
  return {
    msg,
    delay: DELETE_MESSAGE_TIMEOUT_LONG
  }

  function drawBall({ cor, tamanho, posicao }) {
    ctx.beginPath();
    ctx.arc(posicao.x, posicao.y, tamanho, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = cor;
    ctx.stroke();
  }



  //message.reply(`${mapa.nome} que fica em ${JSON.stringify(coordenadas)}`)

}