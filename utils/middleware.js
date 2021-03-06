const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

morgan.token("data", (req, res) => {
  if (req.method == "POST") {
    return [req.body];
  }
  if (req.method == "PUT") {
    return [req.body];
  }
});

const morganmiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data"
);
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: "Email already exists" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token1",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.startsWith("bearer ")) {
    const token = authorization.substring(7);
    request.token = token;
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  request.user = user ? user : null;
  next();
};

module.exports = {
  morganmiddleware,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
