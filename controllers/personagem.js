const controller = require("../controller");

class Personagem {
    static async get(id) {
        // retorna o personagem com esse id
        return controller.personagens.getOne({ _id: id });
    }
    static info(personagem_objeto) {
        // retorna as informações do personagem em string
        return personagem_objeto.nome + ' - ' + personagem_objeto.nivel;
    }
    static async getByUser(id_discord) {
        // retorna todos os personagem do usuário com esse ID DISCORD
        const conta = await controller.contas.getOne({ idDiscord: id_discord });
        return Promise.all(conta.personagens.map(async personagemId => {
            return await this.get(personagemId);
        }));
    }
    static async getActive(conta) {
        return controller.personagens.getOne({ _id: conta.personagemAtivo });
    }
    static async create({ nome, classe, sexo }) {
        // cria um personagem e retorna ele
    }
    static async delete(id) {
        // deleta um personagem pelo ID
    }
    serialize(personagem) {
        return JSON.parse(JSON.stringify(personagem))
    }

}
module.exports = Personagem