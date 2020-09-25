const dbConfig = require("../app/config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
   {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
  
});



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


sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

  let data = [
    {
        'firstName':'Alex',
        'lastName': 'Plash',
    },
    {
        'firstName':'Dima',
        'lastName': 'Sidorov',
    }
];


for(let i=0; i<1000;i++){
    Users.bulkCreate(data, {returning: true})
    .then(function(response){
        // res.json(response);
        console.log("OK")
    })
    .catch(function(error){
        console.log(error.message)
        // res.json(error);
    })
}







