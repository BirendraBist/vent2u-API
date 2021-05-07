module.exports = (sequelize, Sequelize) => {
    const Zone = sequelize.define("zone", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      
      zoneName: {
        type: Sequelize.STRING,
        allowNull:false
      }
    });
  
    return Zone;
  };
  