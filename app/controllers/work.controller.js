const serv = require('../services/work.service')
const servUserWork = require('../services/userWork.service')
  

  let createContr = async function createContr (req, res){

    const query = req.query["q"];
     // Validate request
    if (!req.body.workName) {
        // console.log(req.body)
        res.status(400).send({
        message: "Bad request!"
      });
      return;
    }


    const work = {
      workName: req.body.workName,
    };

    let result;
    await serv.createServ(work, query).then(res => {
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
    if (!req.body.workName) {
      // console.log(req.body)
      res.status(400).send({
      message: "Bad request!"
    });
      return;
    }
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


let fireContr = async function fireContr(req, res){
  const query = req.query["q"];

  if (!req.body) {
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


let workGetDataContr = async function workGetDataContr(req, res){
  const query = req.query["q"];
  let result;
  await serv.getDataServ(req.params.id, query).then(data => {
    result = data;
  }).catch(err => {
    res.status = 400;
    res.message = err.message;
  });
  res.json(result);
  
}



module.exports = {
  createContr,
  findAllContr,
  deleteByIdContr,
  updateByIdContr,
  getByIdContr,
  fireContr,
  workGetDataContr
}


