module.exports = app => {
    const controller  = require("../controllers/work.controller");

    let router = require("express").Router();

    router.post("/", controller.createContr);

    router.get("/", controller.findAllContr);

    router.delete("/:id", controller.deleteByIdContr);

    router.patch('/:id', controller.updateByIdContr);

    router.get('/:id', controller.getByIdContr);

    router.put('/fire', controller.fireContr);

    router.get('/getData/:id', controller.workGetDataContr);

    app.use('/api/works', router);
};