const Sequelize = require("sequelize");
//for the development connection
// const sequelize = new Sequelize("vent2u", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 8889,
// });

//for the remote connection 
const dbConfig= require("../config/db.config")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.room = require("./room.model")(sequelize, Sequelize);
db.zone = require("./zone.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.userpreference=require("./userpreference.model")(sequelize,Sequelize);

module.exports = db;
