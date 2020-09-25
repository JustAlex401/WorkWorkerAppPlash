const repOrm = require('../DAL/userWorkDal/userWork.repositoryOrm');
const repQuer = require('../DAL/userWorkDal/userWork.repositoryQuery');


let createServUserWork = async function createServUserWork(body, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.createRepo(body);
    return result;
    
}

let quitServ =async function quitServ(body, query){
    let rep;
    if(query === 'true'){
        rep = repQuer;
    } else {
        rep = repOrm;
    }
    let result = await rep.quitRepo(body);
    return result;
    
}


module.exports = {
    createServUserWork,
    quitServ
}