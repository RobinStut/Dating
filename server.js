const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layout"),
  })
);

app.set("view engine", "handlebars");

app.get("/", (req, res) =>
  res.render("pages/index", { title: "Your title here" })
);

app.use(function (req, res) {
  res.status(404).render("pages/404");
});

app.listen(3000);
