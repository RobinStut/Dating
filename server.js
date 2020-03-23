const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const authRoutes = require("./routes/auth");
require("dotenv").config();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layout"),
  })
);

app.use(authRoutes);
app.use(bodyParser.json({ limit: "50mb" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) =>
  res.render("pages/index", { title: "Your title here" })
);

app.use(function (req, res) {
  res.status(404).render("pages/404");
});

app.listen(3000);
