const express = require("express");
const cors = require("cors");
const {uuid , isUuid} = require('uuidv4')
// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title , url , techs} = request.body
  const new_user = {
    id: uuid(),
    title ,
    url ,
    techs,
    likes : 0
  }
  repositories.push(new_user)
  return response.json(new_user)
});

app.put("/repositories/:id", (request, response) => {
   const {id} = request.params
   const {title , url , techs , likes} = request.body
   const UserIndex = repositories.findIndex(user => user.id === id)

   if(UserIndex < 0){
     return response.status(400).json({error : "User not founded"})
   }

   const new_user = {
     id,
     title,
     url,
     techs,
     likes : repositories[UserIndex].likes
   }
   repositories[UserIndex] = new_user
   return response.json(new_user)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
   
   const UserIndex = repositories.findIndex(user => user.id === id)

   if(UserIndex < 0){
     return response.status(400).json({error : "User not founded"})
   }
   repositories.splice(UserIndex , 1)
   return response.status(204).json("User deleted")
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
   
   const UserIndex = repositories.findIndex(user => user.id === id)

   if(UserIndex < 0){
     return response.status(400).json({error : "User not founded"})
   }
   
     repositories[UserIndex].likes++
     return response.json({ "likes" : repositories[UserIndex].likes})
});

module.exports = app;
