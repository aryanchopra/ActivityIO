const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.email || !body.password) {
    return response.status(400).send({
      error: "Provide username and password",
    });
  }
  const email = body.email;
  const password = body.password;

  const user = await User.findOne({ email });

  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassword)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    user: user.email,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  response.status(200).json({
    token,
    email: user.email,
    name: user.name,
    id: user._id,
  });
});

module.exports = loginRouter;
