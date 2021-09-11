const {MongoClient} = require('mongodb');

const dbName = process.env.mongoDbName

const client = new MongoClient(process.env.mongodburi, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

async function connect(){
    if(!client.isConnected()) await client.connect()
    const db = client.db(dbName)
    return db
}
module.exports = async() => await connect()