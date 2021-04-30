module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {

        id:{ 
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoincrement:true
      
          },
          roomName: {
            type: Sequelize.STRING,
            required:true
          }

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
        
    });

    return Room;
};
