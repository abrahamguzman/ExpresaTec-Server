const express = require('express');
require('dotenv').config();
const { json } = require('express');
const cors = require('cors');
const { port } = require("./src/config/global.config.js");
const db = require("./src/models/index.js");
const authMiddleware = require("./src/middlewares/auth.middleware.js");
const { statusDbConnection, syncDb } = require("./src/utils/db.utils.js");

const app = express();

app.use(express.json());
app.use(cors());
statusDbConnection(db); // Check the connection to the database
syncDb(db); // Synchronize the database

app.get("/", (req, res) => {
  res.send("!Greetings from the Expresatec server!");
});


app.use("/api/v1/auth", require("./src/routes/auth.js"));
app.use(authMiddleware);

app.use("/api/v1/users", require("./src/routes/user.js"));
app.use("/api/v1/games", require("./src/routes/game.js"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});