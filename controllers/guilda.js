const controller = require("../controller");

class Guilda {
    static async get(id) {
        // retorna a guilda com esse ID
        return controller.guildas.getOne({ _id: id });
    }
    static async getUsers(id) {
        // retorna as contas que estão na guilda com esse ID;
        return controller.contas.get({ guilda: id });
    }
    static async create({ /*nome, classe, sexo*/ }) {
        // cria um guilda e retorna ela
    }
    static async delete(id) {
        // deleta um guilda com esse ID
    }
    serialize(conta) {
        return JSON.parse(JSON.stringify(conta))
    }

}
module.exports = Guilda