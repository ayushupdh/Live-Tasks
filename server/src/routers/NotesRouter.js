const express = require("express");
const Notes = require("../modals/Notes");
const router = new express.Router();
const auth = require("../middleware/auth");
/////////////////     Notes       //////////////////////////////////

//Create a note
router.post("/notes", auth, async (req, res) => {
  try {
    const notes = new Notes({ ...req.body, owner: req.user._id });
    await notes.save();
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get all the notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).send(notes);
  } catch (e) {
    res.sendStatus(400);
  }
});
//Get all the notes of a user
router.get("/notes/me", auth, async (req, res) => {
  try {
    const notes = await Notes.find({ owner: req.user._id });
    res.status(200).send(notes);
  } catch (e) {
    res.sendStatus(400);
  }
});

//Get all the items in the notes
router.get("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const notes = await Notes.findOne({ _id: noteId, owner: req.user._id });
    // await notes.populate("owner").execPopulate(); //Get the owners info
    res.status(200).send(notes);
  } catch (e) {
    res.sendStatus(400);
  }
});

//Update Title
router.patch("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  const note = await Notes.findOne({ _id: noteId, owner: req.user._id });
  try {
    if (!req.body.title) {
      res.sendStatus(400);
    }
    note["title"] = req.body.title;
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Delete the note
router.delete("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Notes.findOneAndDelete({
      _id: noteId,
      owner: req.user._id,
    });
    if (note === null) {
      return res.sendStatus(404);
    }
    res.status(200).send({});
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

/////////////////     Items in the note       //////////////////////////////////

//Add an item to the notes
router.post("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const notes = await Notes.findOne({ _id: noteId, owner: req.user._id });

    const prevlastItemIndex = notes.itemsCollections.length;
    notes.itemsCollections = notes.itemsCollections.concat(req.body);
    await notes.save();
    res.status(200).send(notes.itemsCollections[prevlastItemIndex]);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

//Update an item from the notes
router.patch("/notes/:notesId/:itemId", auth, async (req, res) => {
  const notesId = req.params.notesId;
  const itemId = req.params.itemId;
  const updates = Object.keys(req.body);
  try {
    const notes = await Notes.findOne({ _id: notesId, owner: req.user._id });

    //Throw 404 if supplied notes does not exists
    if (!notes) {
      return res.sendStatus(404);
    }

    const itemIndex = notes.itemsCollections.findIndex(
      (item) => item._id.toString() === itemId
    );

    //Throw 404 if supplied item does not exists in the itemsCollection
    if (itemIndex === -1) {
      return res.sendStatus(404);
    }

    updates.forEach((update) => {
      return (notes.itemsCollections[itemIndex][update] = req.body[update]);
    });

    await notes.save();

    res.status(200).send(notes.itemsCollections[itemIndex]);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Delete a note from the notes
router.delete("/notes/:notesId/:itemId", auth, async (req, res) => {
  const notesId = req.params.notesId;
  const itemId = req.params.itemId;
  try {
    const notes = await Notes.findOne({ _id: notesId, owner: req.user._id });

    //check if the notes exists
    if (!notes) {
      res.sendStatus(404);
    }

    const prevArrayLength = notes.itemsCollections.length;

    notes.itemsCollections = notes.itemsCollections.filter((item) => {
      return item._id.toString() !== itemId;
    });

    //check if the item supplied exists in the notes collection
    if (notes.itemsCollections.length === prevArrayLength) {
      return res.sendStatus(404);
    }
    await notes.save();
    res.status(200).send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
