const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router
  .get("/login", (req, res) => {
    res.render("pages/login");
  })
  .get("/signup", (req, res) => {
    res.render("pages/signup");
  });

module.exports = router;
