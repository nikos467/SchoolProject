const knex = require('knex')
const config = require('../knexfile.js')
const db = knex(config.development)
module.exports = {
    addUser,
    setPoints
}
async function addUser(username, password){
    return db('users').insert({username: username, password: password})
    
    
}

async function setPoints(username, points){
    console.log(username)
    return db('users')
        .where({username})
        .update({points})
        

}