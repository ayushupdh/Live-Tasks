const express = require('express')
const app = express()
const notesRouter = require('./routers/NotesRouter')
const cors = require('cors')
require('./db/mongoose')
app.use(cors())
app.use(express.json())
app.use(notesRouter)

  
  
module.exports = app;