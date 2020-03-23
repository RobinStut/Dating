const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.get("/login", (req, res) => {
  res.render("pages/login");
});

module.exports = router;
