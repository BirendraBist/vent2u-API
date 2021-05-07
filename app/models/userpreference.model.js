module.exports = (sequelize, Sequelize) => {
  const Userprefence = sequelize.define("userpreference", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    temperature: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    humidity: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    airQuality: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
        allowNull: false,
      },
    },
    zoneId: {
      type: Sequelize.INTEGER,
      references: {
        model: "zones",
        key: "id",
        allowNull: false,
      },
    },
  });

  return Userprefence;
};
// id: {
//     primaryKey: true,
//     autoIncrement: true,
//     type: Sequelize.INTEGER
// },
// user_id: {
//     type: Sequelize.INTEGER,
//     references: {
//         model: 'users',
//         key: 'id',
//     }
// },
// roomName: {
//     type: Sequelize.STRING
// },
