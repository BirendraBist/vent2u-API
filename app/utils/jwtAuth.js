const jwt = require("jsonwebtoken");

const createToken = (userName, id) => jwt.sign({ userName, id }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });

module.exports = {
  createToken,
};