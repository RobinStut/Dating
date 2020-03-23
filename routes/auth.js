const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router
  .get("/login", (req, res) => {
    res.render("pages/login");
  })
  .post("/login", (req, res) => {
    console.log(req.body);
    res.render("pages/login");
  })
  .get("/signup", (req, res) => {
    res.render("pages/signup");
  })
  .post("/signup", async (req, res) => {
    const { email, password, age, name, gender } = req.body;
    const user = new User({
      email,
      password,
      age,
      name,
      gender,
    });
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.send(user);
    } catch (e) {
      console.log(e);
      res.redirect("/signup");
    }
  });

module.exports = router;
