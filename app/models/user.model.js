module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    room_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    username: {
      type: Sequelize.STRING,
    },
    // password: {
    //     type: Sequelize.STRING
    // },
  });

  return User;
};
