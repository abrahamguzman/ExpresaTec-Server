const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { port } = require("./src/config/global.config.js");
const db = require("./src/models/index.js");
const authMiddleware = require("./src/middlewares/auth.middleware.js");
const { statusDbConnection, syncDb } = require("./src/utils/db.utils.js");

const app = express();

app.use(cors());
app.use(express.json());
statusDbConnection(db); // Check the connection to the database
syncDb(db); // Synchronize the database

app.get("/", (req, res) => {
  res.send("!Greetings from the Expresatec server!");
});

app.use("/api/v1/auth", require("./src/routes/auth.js"));
app.use(authMiddleware);

app.use("/api/v1/generalInfo", require("./src/routes/generalInfo.js"));
app.use("/api/v1/users", require("./src/routes/user.js"));
app.use("/api/v1/children", require("./src/routes/child.js"));
app.use("/api/v1/categories", require("./src/routes/category.js"));
app.use("/api/v1/games", require("./src/routes/game.js"));
app.use("/api/v1/gameActivities", require("./src/routes/gameActivity.js"));
app.use("/api/v1/emotions", require("./src/routes/emotion.js"));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});