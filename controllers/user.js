const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  try {
    const user = new User({
      email: body.email,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
