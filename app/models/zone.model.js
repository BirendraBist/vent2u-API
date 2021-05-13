module.exports = (sequelize, Sequelize) => {
  const Zone = sequelize.define("zone", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },

    zoneName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roomId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },
  });

  return Zone;
};
