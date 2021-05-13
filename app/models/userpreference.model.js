module.exports = (sequelize, Sequelize) => {
  const Userprefence = sequelize.define("userpreference", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    cold: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    warm: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    dry: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    moist: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    airFlow: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    zoneId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "zones",
        key: "id",
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
