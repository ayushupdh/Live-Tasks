const express = require("express");
const Notes = require("../modals/Notes");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../modals/User");
const sharableFindQuery = (req) => {
  return [{ owner: req.user._id }, { "sharedTo.user": req.user._id }];
};

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
    const notes = await Notes.find({ $or: sharableFindQuery(req) });
    res.status(200).send(notes);
  } catch (e) {
    res.sendStatus(400);
  }
});

//Get all the items in the notes
router.get("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const notes = await Notes.findOne({
      $and: [
        { _id: noteId },
        {
          $or: sharableFindQuery(req),
        },
      ],
    });
    // await notes.populate("owner").execPopulate(); //Get the owners info
    res.status(200).send(notes);
  } catch (e) {
    res.sendStatus(400);
  }
});

//Update Title
router.patch("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  const note = await Notes.findOne({
    $and: [
      { _id: noteId },
      {
        $or: sharableFindQuery(req),
      },
    ],
  });
  try {
    if (!req.body.title) {
      res.sendStatus(400);
    }
    note["title"] = req.body.title;
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    console.log(error);
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

/////////// USER SHARE   //////////////////

//Update Sharable Status
router.patch("/notes/share/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  const updates = req.body;
  const note = await Notes.findOne({ _id: noteId, owner: req.user._id });

  try {
    if (updates.sharable === "true") {
      //If no user with the email address
      if (!note) {
        return res.status(404).send({ error: "No such note found" });
      }

      const userObj = await User.findOne({ email: updates.userEmail });
      //If no user with the email address
      if (!userObj) {
        return res.status(404).send({ error: "No user with that email." });
      }
      //check if the email belongs to the owner
      if (userObj._id.toString() === req.user._id.toString()) {
        return res
          .status(404)
          .send({ error: "You already have access to this note." });
      }

      //Check if the userEmail already exists in sharedTo
      const ifUserAlreadyExist = note.sharedTo.some(
        (item) => item.user.toString() === userObj._id.toString()
      );
      if (ifUserAlreadyExist) {
        return res
          .status(404)
          .send({ error: "User already has access to the note." });
      }

      //update the sharable status to true
      note["sharable"] = updates.sharable;

      //add the sharedTO user if email is provided
      note.sharedTo = updates.userEmail
        ? note.sharedTo.concat({ user: userObj._id })
        : note.sharedTo;
    }
    if (updates.sharable === "false") {
      note["sharable"] = "false";
      note.sharedTo = [];
    }
    await note.save();

    res.status(200).send(note.sharedTo);
  } catch (error) {
    console.trace(error);
    res.sendStatus(500);
  }
});

//Delete Sharable User
router.delete("/notes/share/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  const userId = req.body.user;

  const note = await Notes.findOne({ _id: noteId, owner: req.user._id });
  try {
    if (!note) {
      return res.sendStatus(404);
    }
    note.sharedTo = note.sharedTo.filter((userObj) => {
      return userObj.user.toString() !== userId;
    });

    await note.save();

    res.status(200).send(note.sharedTo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/////////////////     Items in the note       //////////////////////////////////

//Get an item
router.get("/notes/:noteId/:itemId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const itemId = req.params.itemId;
  try {
    const notes = await Notes.findOne({
      $and: [
        { _id: noteId },
        {
          $or: sharableFindQuery(req),
        },
      ],
    });

    //Throw 404 if supplied notes does not exists
    if (!notes) {
      return res.sendStatus(404);
    }

    const itemIndex = notes.itemsCollections.findIndex(
      (item) => item._id.toString() === itemId
    );

    const requiredNote = notes.itemsCollections.filter((item) => {
      return item._id.toString() === itemId;
    });

    res.status(200).send(requiredNote[0]);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Add an item to the notes
router.post("/notes/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const notes = await Notes.findOne({
      $and: [
        { _id: noteId },
        {
          $or: sharableFindQuery(req),
        },
      ],
    });
    const prevlastItemIndex = notes.itemsCollections.length;
    notes.itemsCollections = notes.itemsCollections.concat({
      ...req.body,
      lastEditedBy: req.user._id,
    });
    await notes.save();
    res.status(200).send(notes.itemsCollections[prevlastItemIndex]);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

//Update an item from the notes
router.patch("/notes/:noteId/:itemId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const itemId = req.params.itemId;
  const updates = Object.keys(req.body);
  try {
    const notes = await Notes.findOne({
      $and: [
        { _id: noteId },
        {
          $or: sharableFindQuery(req),
        },
      ],
    });

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
router.delete("/notes/:noteId/:itemId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const itemId = req.params.itemId;
  try {
    const notes = await Notes.findOne({
      $and: [
        { _id: noteId },
        {
          $or: sharableFindQuery(req),
        },
      ],
    });
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
