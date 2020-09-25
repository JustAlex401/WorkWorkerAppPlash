const {db} = require("../../models/index");
const {QueryTypes} = require('sequelize');




let createRepo = async function createRepo(user) {
    
    let result;

    await db.sequelize.query(
        `
            insert into users (firstName, lastName) value ('${user.firstName}', '${user.lastName}');
        `, {type: QueryTypes.INSERT}).then(res => {

            result = {
               id: res["0"],
               ...user
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
            select * from users;
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
        delete from users where id = ${id}
    `).then(res => {
        // console.log(Object.values(res[0])[1])
            if(Object.values(res[0])[1]===1){
                result = "User was deleted successfully!";
            }else {
                result= `Cannot delete User with id=${id}. User was not found!`;
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
            update users set firstName = '${body.firstName}' , lastName = '${body.lastName}' where id = ${id};
        `
    , {type: QueryTypes.UPDATE}).then (res => {
        // console.log(res[0]["affectedRows"])
        if(res[1] == 1){
            result = "User was updated successfully.";
        } else {
            result = `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`;
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
            select * from users where id = ${id};
        `
    ,{type: QueryTypes.SELECT})
    .then(data => {
      result = data[0];
    })
    .catch(err => {
      console.log(err.message);
    });
    return result;

}


let getDataRepo = async function getByIdRepo (id) { 

    let result;
    await db.sequelize.query(
        `
        select distinct u.id as u_id, u.lastName, uw.dateStart, w.id as w_id, w.workName, uw.salary, (select sum(work_users.salary) from work_users where work_users.userId = ${id} and work_users.dateEnd is null) as am 
            from users u join work_users uw on uw.userId = u.id 
                        join works w on w.id = uw.workId
                            where uw.dateEnd is null and u.id = ${id};
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
    