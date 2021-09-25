const activityRouter = require("express").Router();
const Activity = require("../models/activity");
const Project = require("../models/project");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

activityRouter.get("/", userExtractor, async (request, response) => {
  const activities = await Activity.find({ user: request.user.id });
  response.status(200).json(activities);
});

activityRouter.get("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const foundActivity = await Activity.findById(id);
  if (!foundActivity) {
    response.status(404);
  }
  if (foundActivity.user.toString() !== request.user.id) {
    response.status(401);
  }

  response.status(200).json(foundActivity);
});
activityRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (!user) {
    response.status(401).json({
      error: "Invalid Token",
    });
  }
  if (
    !body.sleep ||
    !body.qualityofsleep ||
    !body.workout ||
    !body.qualityofday ||
    !body.meditate ||
    !body.productivehours
  ) {
    response.status(400);
  }

  const receivedactivity = {
    date: body.date ? new Date(body.date) : Date.now(),
    sleep: body.sleep,
    qualityofsleep: body.qualityofsleep,
    workout: body.workout,
    qualityofday: body.qualityofday,
    meditate: body.meditate === "yes" ? true : false,
    user: user.id,
    productivehours: body.productivehours,
    ...(body.project === "yes" && {
      project: {
        id: body.projectid,
        hours: body.projecthours,
      },
    }),
  };
  const newActivity = new Activity(receivedactivity);
  await newActivity.save();
  if (body.project === "yes") {
    const foundProject = await Project.findById(body.projectid);
    foundProject.hours = foundProject.hours + body.projecthours;
    foundProject.activities = foundProject.activities.concat(newActivity.id);
    foundProject.save();
  }
  response.status(200).json(newActivity);
});
activityRouter.put("/:id", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const receivedactivity = {
    date: body.date ? body.date : Date.now(),
    sleep: body.sleep,
    qualityofsleep: body.qualityofsleep,
    workout: body.workout,
    qualityofday: body.qualityofday,
    meditate: body.meditate === "yes" ? true : false,
    user: user.id,
    productivehours: body.productivehours,
    ...(body.project === "yes" && {
      project: {
        id: body.projectid,
        hours: body.projecthours,
      },
    }),
    ...(body.project === "no" && {
      project: null,
    }),
  };

  const existingActivity = await Activity.findById(request.params.id);
  if (existingActivity.project === null || !existingActivity.project.id) {
    if (body.project === "yes") {
      const foundProject = await Project.findById(body.projectid);
      foundProject.hours = foundProject.hours + body.projecthours;
      foundProject.activities = foundProject.activities.concat(
        existingActivity.id
      );
      foundProject.save();
    }
  } else {
    if (body.project === "no") {
      const prevProject = await Project.findById(existingActivity.project.id);
      prevProject.hours = prevProject.hours - existingActivity.project.hours;
      prevProject.activities = prevProject.activities.filter(
        (activityid) => activityid.toString() !== existingActivity.id.toString()
      );
      prevProject.save();
    } else {
      if (existingActivity.project.id.toString() === body.projectid) {
        const foundProject = await Project.findById(body.projectid);
        foundProject.hours =
          foundProject.hours -
          existingActivity.project.hours +
          body.projecthours;
        foundProject.save();
      } else {
        const prevProject = await Project.findById(existingActivity.project.id);
        prevProject.hours = prevProject.hours - existingActivity.project.hours;
        prevProject.activities = prevProject.activities.filter(
          (activityid) =>
            activityid.toString() !== existingActivity.id.toString()
        );
        prevProject.save();
        const foundProject = await Project.findById(body.projectid);
        foundProject.hours = foundProject.hours + body.projecthours;
        foundProject.activities = foundProject.activities.concat(
          existingActivity.id
        );
        foundProject.save();
      }
    }
  }
  const updatedactivity = await Activity.findByIdAndUpdate(
    request.params.id,
    receivedactivity,
    { new: true }
  );
  response.json(updatedactivity);
});
activityRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const foundActivity = await Activity.findById(id);
  if (!foundActivity) {
    response.status(404);
  }
  if (foundActivity.user.toString() === request.user.id) {
    if (foundActivity.project.id) {
      const foundProject = await Project.findById(foundActivity.project.id);
      foundProject.hours = foundProject.hours - foundActivity.project.hours;
      foundProject.activities = foundProject.activities.filter(
        (activityid) => activityid.toString() !== foundActivity.id.toString()
      );
      foundProject.save();
    }
    await Activity.findByIdAndRemove(id);

    response.status(204).end();
  } else {
    response.status(403).json({
      error: "Activity does not belong to user",
    });
  }
});
module.exports = activityRouter;
