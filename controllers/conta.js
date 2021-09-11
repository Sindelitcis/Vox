const controller = require("../controller");

class Conta {
    static async get(id) {
        // retorna a conta com esse id
        return controller.contas.getOne({ _id: id });
    }
    static async getByDiscordID(id) {
        // retorna a conta com esse ID DISCORD
        return controller.contas.getOne({ idDiscord: id });
    }
    static async create({ nome, classe, sexo }) {
        // cria um personagem e retorna ele
    }
    static async delete(id) {
        // deleta um personagem pelo ID
    }
    serialize(conta) {
        return JSON.parse(JSON.stringify(conta))
    }

}
module.exports = Conta