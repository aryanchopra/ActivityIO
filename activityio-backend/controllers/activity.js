const activityRouter = require("express").Router();
const Activity = require("../models/activity");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

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
  console.log(body);
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
    date: body.date ? body.date : Date.now(),
    sleep: body.sleep,
    qualityofsleep: body.qualityofsleep,
    workout: body.workout,
    qualityofday: body.qualityofday,
    meditate: body.meditate === "yes" ? true : false,
    user: user.id,
    productivehours: body.productivehours,
    ...(body.project && {
      project: {
        id: body.project.id,
        hours: body.project.hours,
      },
    }),
  };
  const newActivity = new Activity(receivedactivity);
  await newActivity.save();

  response.status(200).json(newActivity);
});

module.exports = activityRouter;
