const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
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
        lastEditedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    sharable: {
      type: String,
      default: "false",
    },
    sharedTo: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          unique: true,
          ref: "User",
        },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    strictQuery: true,
  }
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
