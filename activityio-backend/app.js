const express = require("express");
const cors = require("cors");
const {
  morganmiddleware,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const activityRouter = require("./controllers/activity");
const projectRouter = require("./controllers/project");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morganmiddleware);
app.use("/api/user", userRouter);
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/project", projectRouter);
app.use("/api/activity", activityRouter);
app.use(errorHandler);

module.exports = app;
