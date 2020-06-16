const express = require("express");
const app = express();
const notesRouter = require("./routers/NotesRouter");
const userRouter = require("./routers/UserRouter");

const cors = require("cors");
require("./db/mongoose");

app.use(cors());
app.use(express.json());
app.use(notesRouter);
app.use(userRouter);

module.exports = app;
