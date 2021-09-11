const controller = require("../controller");

class Regiao {
    static async get(id) {
        // retorna a regiao com esse ID
        return controller.regioes.getOne({ _id: id });
    }
    static async create({ nome, classe, sexo }) {
        // cria uma regiao e retorna ela
    }
    static async delete(id) {
        // deleta uma regiao pelo ID
    }
    serialize(conta) {
        return JSON.parse(JSON.stringify(conta))
    }

}
module.exports = Regiao