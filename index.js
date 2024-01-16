const express = require("express");
const uuid = require("uuid");
const app = express();
const port = 3001;
app.use(express.json());

// GET =========> Busca informações no Back-End
// POST ========> Cria informação / ões no Back-end
// PUT / PATCH => Altera / Atualiza informações no Back-end
// DELETE ======> Deleta informações no Backend
// MIDDLEWARE ==> INTERCEPTADOR => Tem o poder de parar ou alterar dados de requisição.

const users = []; // Array vazio

const checkUserId = (request, response, next) => {

  const { id } = request.params // Confere

  const index = users.findIndex(user => user.id === id) // Verifica

  if ( index < 0) {
    return response.status(404).json({message: "User not found"});
  } // Condiciona

  request.userIndex = index // Retorna

  request.userId = id // Retorna

  next()

}


app.get("/users", (request, response) => {

  return response.json({ users });

});

app.post("/users", (request, response) => {

  const { name, age, country, state, city } = request.body;

  const user = { id: uuid.v4(), name, age, country, state, city };

  users.push(user);

  return response.status(201).json(user);

});

app.put("/users/:id", checkUserId, (request, response) => {

  const { name, age, country, state, city } = request.body;

  const index = request.userIndex;

  const id = request.userId;

  const updatedUser = { id, name, age, country, state, city };

  users[index] = updatedUser;

  return response.json(updatedUser);

});

app.delete("/users/:id", checkUserId, (request, response) => {

  const index = users.findIndex(user => user.id === id);

  users.splice(index, 1);

  return response.status(204).json();

});

app.listen(port, () => {

  console.log(`=>Server Started on port ${port} Successfully<=`);

});

// http://localhost:3001/users digitar assim depois de de rodar o npm index.js

// Query Params =>
// meusite.com/users?name=rafael&age:34& =>
// Filtros

// Route Params =>
// meusite.com/users2 =>
// Buscar, Deletar ou Atualizar algo especifico

// Request Body =>
// { name: Rafael, age: 34, ...}

// Endereço Completo
// http://localhost:3001/users?Name=Rafael&Age=34&Country=Brazil&State=Rio de Janeiro&City=Rio de Janeiro
