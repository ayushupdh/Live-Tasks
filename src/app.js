const express = require("express");
const path = require("path");
const app = express();
const notesRouter = require("./routers/NotesRouter");
const userRouter = require("./routers/UserRouter");

const cors = require("cors");
require("./db/mongoose");

app.use(cors());
app.use(express.json());
app.use(notesRouter);
app.use(userRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
