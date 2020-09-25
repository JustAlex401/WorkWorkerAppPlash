module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sasha991999a",
  DB: "plashko_crud_workers",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


