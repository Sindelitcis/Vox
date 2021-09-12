const controller = require('../controller');
const { CONFIG, DELETE_MESSAGE_TIMEOUT_MEDIUM } = require('../constants');
const { Permissions } = require('discord.js');

module.exports = async (client, message, args, servidor, force = false) => {
  const idDiscord = message.guild.id;
  if (!servidor || force) {
    const _config = async () => {
      const promise_categorias = Object.keys(CONFIG.categorias).map(async categoria => {
        const createdCategory = await message.guild.channels
          .create(categoria, { type: 'category' });

        return ({ nome: categoria, id: createdCategory.id });
      })
      const categorias = await Promise.all(promise_categorias);
      const promise_canais = categorias
        .map(categoria => ({ nome: categoria.nome, id: categoria.id }))
        .map(categoria => ({ canais: CONFIG.categorias[categoria.nome], categoriaId: categoria.id }))
        .map(categoria => {
          return categoria.canais.map(async canal => {
            const createdChannel = await message.guild.channels
              .create(canal.nome, {
                type: 'text',
                parent: categoria.categoriaId
              });
            return ({ nome: canal.nome, id: createdChannel.id });

          }).flat();

        }).flat()

      const canais = await Promise.all(promise_canais);

      // Remover permissao de ver canais e categorias
      [...canais, ...categorias].forEach(async canal => {
        client.channels.cache.get(canal.id)
          .updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          })
      });

      const promise_cargos = CONFIG.cargos.map(async cargo => {
        const createdCargo = await message.guild.roles.create({
          data: {
            name: cargo.nome,
            color: cargo.cor,
            reason: 'Cargo VOX'
          }
        });
        return ({ nome: cargo.nome, id: createdCargo.id });
      })

      const boasVindasCanal = await message.guild.channels
        .create(CONFIG.boasVindas, {
          type: 'text'
        });

      boasVindasCanal.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: true,
        ADD_REACTIONS: false
      })
      canais.push({
        id: boasVindasCanal.id,
        nome: CONFIG.boasVindas
      })
      const cargos = await Promise.all(promise_cargos);

      for (const cargo of CONFIG.cargos) {
        for (const canCriado of [...canais, ...categorias]) {
          if (cargo.deixaVer.includes(canCriado.nome)) {
            const canal = client.channels.cache.get(canCriado.id);
            const cargoPraDeixarVer = cargos.find(c => c.nome.toLowerCase() === cargo.nome.toLowerCase());
            canal.updateOverwrite(cargoPraDeixarVer.id, { VIEW_CHANNEL: true });
          }
        }
      }

      return ({ categorias, canais, cargos })
    }
    const config = await _config();
    const { categorias, canais, cargos, boasVindasCanal } = config;

    const servidor_check = await controller.servidores.getOne({ idDiscord });
    const dono = await client.users.fetch(message.guild.ownerID);
    if (!servidor_check) {
      // CRIANDO UM DOCUMENTO NA DB NO SERVIDOR
      await controller.servidores.push({
        idDiscord,
        categorias,
        canais,
        cargos,
        criadoEm: new Date().getTime(),
        dono: {
          id: dono.id,
          tag: dono.username + '#' + dono.discriminator
        },
        nomeDoServidor: message.guild.name,
        ativadoPor: {
          id: message.author.id,
          tag: message.author.tag
        }
      });
    } else {
      // REATIVANDO O VOX NO SERVIDOR
      await controller.servidores.update({ idDiscord }, {
        $set: {
          categorias,
          canais,
          cargos,
          reativadoEm: new Date().getTime(),
          'dono.tag': dono.username + '#' + dono.discriminator,
          nomeDoServidor: message.guild.name
        },
        $unset: {
          desativado: 1
        }
      })
    }
  } else {
    message
      .reply('O servidor já está configurado. Para resetá-lo digite `s+reset`')
      .then(msg => msg.delete({ timeout: DELETE_MESSAGE_TIMEOUT_MEDIUM }));
  }
}