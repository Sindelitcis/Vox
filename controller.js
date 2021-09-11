const db = require('./dbconfig')
module.exports = {
   
    contas: {
async count(query) {
        const res = await database_count("usuarios", query)
            return res

        },
        async get(query) {
            const res = await database("usuarios", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("usuarios", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("usuarios", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("usuarios", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("usuarios", query)
            return res
        }
    },
    personagens: {
        async get(query) {
            const res = await database("personagens", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("personagens", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("personagens", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("personagens", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("personagens", query)
            return res
        }
    },
    items: {
        async get(query) {
            const res = await database("items", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("items", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("items", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("items", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("items", query)
            return res
        }
    },
    guildas: {
        async count(query) {
        const res = await database_count("guildas", query)
            return res

        },
        async get(query) {
            const res = await database("guildas", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("guildas", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("guildas", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("guildas", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("guildas", query)
            return res
        }
    },
    mobs: {
        async get(query) {
            const res = await database("mobs", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("mobs", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("mobs", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("mobs", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("mobs", query)
            return res
        }
    },
    missoes: {
        async get(query) {
            const res = await database("missoes", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("missoes", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("missoes", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("missoes", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("missoes", query)
            return res
        }
    },
    regioes: {
        async get(query) {
            const res = await database("regioes", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("regioes", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("regioes", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("regioes", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("regioes", query)
            return res
        }
    },
    skills: {
        async get(query) {
            const res = await database("skills", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("skills", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("skills", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("skills", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("skills", query)
            return res
        }
    },
    classes: {
        async get(query) {
            const res = await database("classes", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("classes", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("classes", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("classes", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("classes", query)
            return res
        }
    },
    servidores: {
        async get(query) {
            const res = await database("servidores", query)
            return res
        },
        async getOne(query) {
            const res = await database_one("servidores", query)
            return res
        },
        async push(usuario) {
            const res = await insert_database("servidores", usuario)
            return res
        },
        async update(query, updateQuery) {
            const res = await update_database("servidores", query, updateQuery)
            return res
        },
        async remove(query) {
            const res = await remove_database("servidores", query)
            return res
        }
    },
    
}
async function database_count(collection, query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection(collection).countDocuments(query||{}))
        resolve(response)
        
    })
}
async function database(collection, query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection(collection).find(query||{})).toArray()
        resolve(response)
        
    })
}
async function database_one(collection, query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection(collection).findOne(query||{}))
        return resolve(response)
        
    })
}
async function update_database(collection, query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection(collection).updateMany(query, updateQuery, (er,re)=>{
            resolve(!er)
        }))
        
    })
}
async function insert_database(collection, query) {
    return await new Promise(async (resolve, reject) => {
        return ((await db()).collection(collection).insertOne(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}
async function remove_database(collection, query) {
    return await new Promise(async (resolve, reject) => {
        return ((await db()).collection(collection).deleteMany(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}

