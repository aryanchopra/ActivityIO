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
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (_, res) => {
    let url = path.join(__dirname, "client/build", "index.html");
    // if (!url.startsWith("/app/"))
    //   // we're on local windows
    //   url = url.substring(1);
    res.sendFile(url);
  });
}

module.exports = app;
