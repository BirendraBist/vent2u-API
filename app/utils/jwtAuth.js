const jwt = require("jsonwebtoken");

const createToken = (userName, id) =>
  jwt.sign({ userName, id }, process.env.TOKEN_SECRET, { expiresIn: "3600s" });

module.exports = {
  createToken,
};
