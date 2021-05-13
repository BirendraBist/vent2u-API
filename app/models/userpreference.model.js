module.exports = (sequelize, Sequelize) => {
  const Userprefence = sequelize.define("userpreference", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      
    },
    cold: {
      type: Sequelize.INTEGER,
    },
    warm: {
      type: Sequelize.INTEGER,
    },
    dry: {
      type: Sequelize.INTEGER,
    },
    moist: {
      type: Sequelize.INTEGER,
    },
    airFlow: {
      type: Sequelize.INTEGER,
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
