const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Note",
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

notesSchema.methods.toJSON = function () {
  const notes = this;
  const notesObject = notes.toObject();

  delete notesObject.itemsCollections;

  return notesObject;
};
const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
