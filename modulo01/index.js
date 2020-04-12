const express = require("express");

const server = express();
server.use(express.json());

//Query params = ?teste=1
//Route  params = /users/1
//Request body = { "name":"Diego", "email": "diego@testejson.com" }

// server.get("/teste", (req, res) => {
//   return res.send("Hello World");
// });
//ou

const users = ["Diego", "Claúdio", "Victor", "Robson"];

//middlewere global
server.use((req, res, next) => {
  console.time("Request");

  console.log(`Metódo: ${req.method}; Url: ${req.url}`);
  next();

  console.timeEnd("Request");
});

//middlewere local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: " User name is required" });
  }

  return next();
}

function checkIndexExists(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "Index is not valid" });
  }
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:id", checkIndexExists, (req, res) => {
  //   const name = req.query.nome;
  const index = req.params.id;

  return res.json({
    message: `${users[index]}`
  });
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkIndexExists, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  5642;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkIndexExists, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
