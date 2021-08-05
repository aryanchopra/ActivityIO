const morgan = require("morgan");

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
  console.log("error handler called");

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token1",
    });
  }

  next(error);
};
module.exports = { morganmiddleware, errorHandler };
