const serv = require('../services/user.service');
const servUserWork = require('../services/userWork.service');
  

  let createContr = async function createContr (req, res){

    const query = req.query["q"];
     // Validate request
    if (!req.body.firstName) {
        console.log(req.body)
        res.status(400).send({
        message: "Bad request!"
      });
      return;
    }

    // Create a User
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    let result;
    await serv.createServ(user, query).then(res => {
      result = res;
    }).catch(err => {
      res.status = 400,
      res.message = err.message;
    });

    res.json(result);

  }



let findAllContr = async function findAllContr (req, res) {
  const query = req.query["q"];

  let result;
    await serv.findAllServ(query).then(res => {
      result = res;
    }).catch(err => {
      res.status = 404,
      res.message = err.message;
    });

    res.json(result);

  }




let deleteByIdContr = async function deleteByIdContr (req, res) {
    const id = req.params.id;
    const query = req.query["q"];
    let result;
    await serv.deleteByIdServ(id, query).then(res => {
      result = res;
    }).catch(err => {
      res.status = 500,
      res.message = err.message;
    });

    res.json(result);
  
  };



  // Update a Tutorial by the id in the request
let updateByIdContr = async function updateByIdContr (req, res) {
    const id = req.params.id;
    if (!req.body.firstName) {
      console.log(req.body)
      res.status(400).send({
      message: "Bad request!"
    });
      return;
    }
    
    console.log(id)
    const body = req.body;
    const query = req.query["q"];
    let result;
    await serv.updateByIdServ(id, body, query).then(data => {
      result = data;
    }).catch(err => {
      res.status = 500;
      res.message = err.message;
    })

    res.json(result);


};



let getByIdContr = async function getByIdContr(req, res){
  const id = req.params.id;

  const query = req.query["q"];
  let result;
    await serv.getByIdServ(id, query).then(data => {
      result = data;
    }).catch(err => {
      res.status = 500;
      res.message = err.message;
    })

    res.json(result);
  
}



let userStartWorkContr = async function userStartWorkContr(req, res){
  const query = req.query["q"];

  let result;
  if (!req.body.userId) {
     console.log(req.body)
     res.status(400).send({
     message: "Bad request!"
   });
   return;
 }

 await servUserWork.createServUserWork(req.body, query).then(data => {
    result = data;
 }).catch(err => {
   res.status = 400;
   res.message = err.message;
 });

 res.json(result);
  
}


let quitContr = async function quitContr(req, res){
  const query = req.query["q"];

  if (!req.body.userId) {
    console.log(req.body)
    res.status(400).send({
    message: "Bad request!"
  });
  return;
}

  let result;
  await servUserWork.quitServ(req.body, query).then(data => {
    result = data;
  }).catch(err => {
    res.status = 400;
    res.message = err.message;
  });
  res.json(result);
}


let userGetDataContr = async function userGetDataContr(req, res){
  let result;
  const query = req.query["q"];
  await serv.getDataServ(req.params.id, query).then(data => {
    result = data;
  }).catch(err => {
    res.status = 400;
    res.message = err.message;
  });
  console.log(result)
  res.json(result);
}



module.exports = {
  createContr,
  findAllContr,
  deleteByIdContr,
  updateByIdContr,
  getByIdContr,
  userStartWorkContr,
  quitContr,
  userGetDataContr
}

