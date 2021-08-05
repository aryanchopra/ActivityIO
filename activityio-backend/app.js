const express = require("express");
const cors = require("cors");
const { morganmiddleware, errorHandler } = require("./utils/middleware");
const usersRouter = require("./controllers/user");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morganmiddleware);
app.use("/api/user", usersRouter);
// app.get("/", (request, response) => {
//   response.send("hi");
// });
app.use(errorHandler);

module.exports = app;
