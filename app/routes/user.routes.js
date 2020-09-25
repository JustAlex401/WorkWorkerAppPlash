module.exports = app => {
    const controller  = require("../controllers/user.controller.js");

    let router = require("express").Router();

    router.post("/", controller.createContr);

    router.get("/", controller.findAllContr);

    router.delete("/:id", controller.deleteByIdContr);

    router.patch('/:id', controller.updateByIdContr);

    router.get('/:id', controller.getByIdContr);

    router.post('/workSt', controller.userStartWorkContr);

    router.put('/quit', controller.quitContr);

    router.get('/getData/:id' , controller.userGetDataContr);

    app.use('/api/users', router);
};