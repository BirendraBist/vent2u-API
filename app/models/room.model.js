module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    roomName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
     userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
            allowNull:false
        }
    },
  });

  return Room;
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