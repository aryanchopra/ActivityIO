const projectRouter = require("express").Router();
const Project = require("../models/project");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

projectRouter.get("/", async (request, response) => {
  const projects = await Project.find({}).populate("user");
  response.json(projects);
});

projectRouter.get("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const foundProject = await Project.findById(id);
  if (!foundProject) {
    response.status(404);
  }
  if (foundProject.user.toString() !== request.user.id) {
    response.status(401);
  }

  response.status(200).json(foundProject);
});

projectRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    response.status(401).json({
      error: "Invalid Token",
    });
  }
  if (!body.name || !body.description) {
    response.status(400).end();
  }

  const receivedproject = {
    name: body.name,
    description: body.description,
    user: user.id,
    completed: body.completed ? body.completed : false,
    date: body.date ? body.date : Date.now(),
  };
  const newProject = new Project(receivedproject);
  await newProject.save();

  response.status(200).json(newProject);
});

module.exports = projectRouter;
