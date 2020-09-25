const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {db} = require("./app/models/index");
// const tutorialController = require("./app/controllers/user.controller");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(request, response, next){

  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
  console.log(data);
  // fs.appendFile("server.log", data + "\n", function(){});
  next();

});


db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});


require("./app/routes/work.routes")(app);
require("./app/routes/user.routes")(app);

// require('./app/controllers/tutorial.controller')(new tutorialController());

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log()
});