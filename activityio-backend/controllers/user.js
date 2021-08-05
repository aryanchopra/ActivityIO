const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
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
    if (error.errors.email.kind === "unique") {
      return response.status(403).send({
        error: "Email already exists in database",
      });
    } else {
      return response.status(403).send({
        error: "Invalid email",
      });
    }
  }
});

module.exports = usersRouter;
