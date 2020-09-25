const {db} = require("../../models/index");
const {QueryTypes} = require('sequelize');




let createRepo = async function createRepo(body) {
    
    let result;

    await db.sequelize.query(
        `
            insert into works (workName) value ('${body.workName}');
        `,{type: QueryTypes.INSERT}).then(res => {

            result = {
               id: res["0"],
               ...body
            }

        }).catch((err)=>{
            console.log(err.message)
        });
    return result;
}



let findAllRepo = async function findAllRepo() {
    
    let result;

    await db.sequelize.query(
        `
            select * from works;
        `, {type: QueryTypes.SELECT}).then(res => {
            result = res;
        }).catch((err)=>{
            console.log(err.message)
        });
    return result;
}




let deleteByIdRepo = async function deleteByIdRepo(id){
    let result;
     
    await db.sequelize.query(
    `
        delete from works where id = ${id}
    `).then(res => {
            if(Object.values(res[0])[1]===1){
                result = "Work was deleted successfully!";
            }else {
                result= `Cannot delete Work with id=${id}. Work was not found!`;
            }
        })
        .catch(err => {
            result=err.message;
        });

    return result;
}



let updateByIdRepo = async function updateByIdRepo (id, body) { 
    let result;
    
    await db.sequelize.query(
        `
            update works set workName = '${body.workName}' where id = ${id};
        `
    , {type: QueryTypes.UPDATE}).then (res => {
        console.log(res)
        if(res[1] == 1){
            result = "Work was updated successfully.";
        } else {
            result = `Cannot update Work with id=${id}. Maybe Work was not found or req.body is empty!`;
        }
    }).catch (err => {
        result = err.message;
    })

    return result;
}



let getByIdRepo = async function getByIdRepo (id) { 

    let result;
    await db.sequelize.query(
        `
            select * from works where id = ${id};
        `
    ,{type: QueryTypes.SELECT})
    .then(data => {
        if(data.length === 0){
            result = 'Not found!';
        }else {
            result = data;
        }
     
    })
    .catch(err => {
      console.log(err.message);
    });
    return result;

}


let getDataRepo = async function getDataRepo (id) { 

    let result;
    await db.sequelize.query(
        `
         select distinct w.id as w_id, w.workName, u.id as u_id, uw.salary, (select sum(work_users.salary) from work_users where work_users.workId = ${id} and work_users.dateEnd is null) as am from works w 
                join work_users uw on w.id = uw.workId
		        join users u on u.id = uw.userId
                 where uw.dateEnd is null and w.id = ${id};
        `
    ,{type: QueryTypes.SELECT})
    .then(data => {
      result = data;
    })
    .catch(err => {
      console.log(err.message);
    });
    return result;

}



module.exports = {
    createRepo,
    findAllRepo,
    deleteByIdRepo,
    updateByIdRepo,
    getByIdRepo,
    getDataRepo
}
    