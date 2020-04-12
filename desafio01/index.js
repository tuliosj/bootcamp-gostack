const express = require("express");

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.time("request");
  console.log(`Metodo:${req.method}`);
  console.timeEnd("request");
});
function checkIdExists(req, res, next) {
  if (!projects[req.params.id]) {
    return res.status(400).json({ error: "id não existe" });
  }
}

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const newObj = req.body;

  projects.push(newObj);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(x => x.id === id);

  const { title } = req.body;

  projects[index].tasks.push(title);

  //   const projects = projects.find(x => x.id === id);

  //   projects.tasks.push(title);

  //   return res.json(projects);

  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const index = projects.findIndex(x => x.id === id);
  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(x => x.id === id);

  projects.splice(index, 1);
  return res.json(projects);
});

server.listen(3000);
