const Sequelize = require("sequelize");
const sequelize = new Sequelize('vent2u', 'root', 'root', {
  host: "localhost",
  dialect: "mysql",
  port: 8889
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.users = require("./user.model.js")(sequelize, Sequelize);
//db.room = require("./room.model")(sequelize, Sequelize);


module.exports = db;