const User = require("../modals/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findOne({ _id: decoded, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
module.exports = auth;
