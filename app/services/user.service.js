const repOrm = require('../DAL/usersDal/user.repositoryOrm')
const repQuer = require('../DAL/usersDal/user.repositoryQuery')


let createServ = async function createServ (body, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.createRepo(body);
    return result;
}


let findAllServ = async function findAllServ (query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.findAllRepo();
    return result;
}


let deleteByIdServ = async function deleteByIdServ (id, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.deleteByIdRepo(id);
    return result;
}


let updateByIdServ = async function updateByIdServ (id, body, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.updateByIdRepo(id, body);
    return result;
}



let getByIdServ = async function getByIdServ (id, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.getByIdRepo(id);
    return result;
}


let getDataServ = async function getByIdServ (id, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.getDataRepo(id);
    return result;
}




module.exports = {
    createServ,
    findAllServ,
    deleteByIdServ,
    updateByIdServ,
    getByIdServ,
    getDataServ
}