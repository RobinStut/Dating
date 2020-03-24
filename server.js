const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoose = require("mongoose");

// Mongoose connection setup
const uri =
  "mongodb+srv://admin:" +
  process.env.DB_PASS +
  "@projecttech-a3phf.mongodb.net/test";

mongoose.connect(uri || "mongodb://localhost/playlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// MongoDB connection setup
async function main() {
  const uri =
    "mongodb+srv://admin:" +
    process.env.DB_PASS +
    "@projecttech-a3phf.mongodb.net/test";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// Database function retrieve list databases

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

// Mongoose Schema
const Schema = new mongoose.Schema({
  song: String,
  artist: String,
});

// Model
const PlayList = mongoose.model("PlayList", Schema);

// Static folders
app.use(express.static(path.join(__dirname, "/main")));

// Handlebars setup

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layout"),
  })
);

app.set("view engine", "handlebars");

// Body Parser setup

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Routing

app.get("/", (req, res) =>
  res.render("pages/index", {
    title: "Your title here",
  })
);

app.use(function (req, res) {
  res.status(404).render("pages/404");
});

// Routing index
app.get("/", (req, res) => {
  res.render("index", {
    title: "Seek matches",
  });
});

// Routing profile
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile settings",
  });
});

// Routing view playlist user {
app.get("/view-playlist", (req, res) => {
  res.render("view-playlist", {
    title: "Playlist",
  });
});

// Routing songs
app.get("/songs", function (req, res) {
  res.render("songs", {
    title: "Add songs to your playlist",
  });
});

app.listen(3000);
