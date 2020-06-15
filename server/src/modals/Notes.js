const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Title",
    trim: true,
  },
  itemsCollections: [
    {
      item: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
