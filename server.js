const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
  connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send(db.users);
// });

// home route
app.get("/", (req, res) => {
  res.send("It is working!");
});

// Used depency injection to inject db and bcrypt into the handleSignin function
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// Used depency injection to inject db and bcrypt into the handleRegister function
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleAPI(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
