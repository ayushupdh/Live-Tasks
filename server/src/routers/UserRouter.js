const express = require("express");
const Users = require("../modals/User");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  try {
    const user = new Users(req.body);
    const token = await user.generateToken();
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/users/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Users.findByCredentials(email, password);
    const token = await user.generateToken();

    res.send({ user, token });
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.user._id);
    res.status(200).send({});
  } catch (e) {
    res.sendStatus(500);
  }
});
router.delete("/users", async (req, res) => {
  try {
    await Users.deleteMany();
    res.status(200).send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
