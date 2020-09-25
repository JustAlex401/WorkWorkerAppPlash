const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const {result} = require('./models');

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


const db = result(sequelize, Sequelize);


db.Sequelize = Sequelize;
db.sequelize = sequelize;




module.exports = {
  db
};



/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////



// const mysql = require("mysql");

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

// // open the MySQL connection
// connection.connect(error => {
//   if (error){
//     console.log(error)
//   }
//   console.log("Successfully connected to the database.");
// });