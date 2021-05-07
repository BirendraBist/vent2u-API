module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull:false,

    },
    password: {
        type: Sequelize.STRING,
        allowNull:false,
    }
  });

  return User;
};
// room_id: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: "users",
    //     key: "id",
    //   },
    // },
