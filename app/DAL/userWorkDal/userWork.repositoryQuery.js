const {db} = require("../../models/index");
const {QueryTypes} = require('sequelize');

let createRepo = async function createRepo(body) {

    let result;


    const t = await db.sequelize.transaction();

    try{
        const countWorkUs = await db.sequelize.query(
            `
                select count(*) as c from work_users where work_users.userId=${body.userId} and work_users.workId=${body.workId} and dateEnd is null;
            `
        ,  {type: QueryTypes.SELECT},{ transaction: t }).catch(err => {
            result = err.message;
        })

        const amount = await db.sequelize.query(
            `
                select sum(work_users.workTime) as am from work_users where work_users.userId=${body.userId} and dateEnd is null;
            `
        , {type: QueryTypes.SELECT}, { transaction: t }).catch(err => {
            result = err.message;
        })

        let am = Number(amount[0]["am"])
        // console.log(am+body.workTime)


        if(countWorkUs[0]["c"] === 0 && ((am + body.workTime)<=20 || am === null)){
            await db.sequelize.query(
                `
                    insert into work_users (dateStart, workTime, salary, userId, workId) values ( current_date(), ${body.workTime}, ${body.salary}, ${body.userId}, ${body.workId});
                `
            ,{ transaction: t }).then(data => {
                result = {
                    id: data["0"],
                    ...body
                 }
            }).catch(err => {
                result = err.message;
            })
        }  else {
            result= "Bad values for worker!"
        }

        await t.commit();
    } catch (err) {
        result =err.message;
        await t.rollback();
    }


    return result;

}


let quitRepo = async function quitRepo(body) {

    let result;

    await db.sequelize.query(
        `
            update work_users set dateEnd = current_date() where work_users.userId = ${body.userId} and  work_users.workId = ${body.workId} and work_users.dateEnd is null;
        `, {type: QueryTypes.UPDATE}).then(res => {
            if(res[1]===1){
                result = "success!"
            } else {
               result = "Can't quit!"
            }
        }).catch((err)=>{
            result = err.message;
        });
    return result;
}


module.exports = {
    createRepo,
    quitRepo
}