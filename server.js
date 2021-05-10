const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// var corsOptions = {
//   origin: "*"
// };

//app.use(cors(corsOptions));
const db = require("./app/models");

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mental-shower application." });
});
 require("./app/routes/room.routes")(app);
require("./app/routes/zone.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/userpreference.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});