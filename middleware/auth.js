const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
  } catch (e) {
    // Needs to redirect
    res.send("needs redirecting");
  }
};

module.exports = auth;
