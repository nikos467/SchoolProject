const sqlite3 = require('sqlite3').verbose()
const UsersDbHelper = require('./models/UserDbHelper')

const express = require('express')
const app = express()

let currentActiveUser


app.get('/register', async (request, response) =>{
  const username = request.query.username
  const password = request.query.password

  if (!username || !password){
    response.send("You have to provide username and password")
    return;
  }

  try {
    await UsersDbHelper.addUser(username, password)
    response.send("User succesfuly created")
  }
  catch(error){
    response.send(error)
  }

  
})

app.get('/setActiveUser', (request, response) =>{
  const username = request.query.username

  if (!username){
      response.send("You have to provide a username")
      return;
  }
  currentActiveUser = username
  response.send(`${username} is now the active user`)
})

app.get('/setPoints', async (request, response) =>{
  const points = request.query.points
  

  UsersDbHelper.setPoints(currentActiveUser, points)
  
  .then(()=>{
    response.send(`${currentActiveUser} now has ${points} points`)
    // If user doesnt exist then it doesnt actually set the points
    //but its not gonna return an error so be careful when using it
  })




})
app.listen(6900)