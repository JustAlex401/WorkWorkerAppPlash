// const {DataTypes} = require('sequelize')


const result = (sequelize, Sequelize) => {


  const Users = sequelize.define("user", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // unique : true,
      allowNull: false,
    },


    firstName: {  
      type: Sequelize.STRING,
      allowNull: false,
    },


    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});




  const Works = sequelize.define("work", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // unique : true,
      allowNull: false,
    },

    workName: {  
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});




  const Work_user = sequelize.define("work_user", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique : true,
      allowNull: false,
    },

    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },

    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   foreignKey : true,
    // },


    dateStart: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },

    dateEnd: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },


    workTime: {  
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 20,
      }
    },

    salary: {
      type: Sequelize.INTEGER,
      allowNull:false,
     
    }

  },
  {
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

  Users.hasMany(Work_user);
  Works.hasMany(Work_user);
  Work_user.belongsTo(Users);
  Work_user.belongsTo(Works);
  Users.belongsToMany(Works,{through: 'Work_user', foreignKey: 'userId'})
  Works.belongsToMany(Users,{through: 'Work_user', foreignKey: 'workId'})

  const db1 ={};

  db1.users = Users;
  db1.works = Works;
  db1.userWork = Work_user;

  return db1;
};




module.exports ={
  result

}