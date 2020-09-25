// const { Sequelize } = require("sequelize/types");
const {db} = require("../../models/index");
const UserWork= db.userWork;
const Op = db.Sequelize.Op;


let createRepo = async function createRepo(body) {
    let result;

    const t = await db.sequelize.transaction();

    try{
        let result;
        let countWorkUs;
        await UserWork.count({
            where : {
                userId: {
                    [Op.eq]: body.userId,
                },
                workId:{
                    [Op.eq] : body.workId
                },
                dateEnd:{
                    [Op.eq] : null
                },
            }
        }, { transaction: t }).then(data => {
            countWorkUs = data;
        }).catch(err => {
            result = err.message;
        });

    

        let amount;
        await UserWork.sum('work_user.workTime',
            {
                where: {
                    userId: {
                        [Op.eq]: body.userId
                    },
                    dateEnd:{
                        [Op.eq] : null
                    },
                }
            }
        ,{ transaction: t }).then(data => {
            amount = data;
        }).catch(err => {
            result = err.message;
        })


        if(countWorkUs === 0 && ((amount + body.workTime)<=20 || amount === null)){
            await UserWork.create(body).then(data => {
                result = data;
            }).catch(err => {
                result = err.message
            })
        } else {
            result= "Bad values for worker!"
        }


        await t.commit();

        return result;
    } catch (err) {
        result =err.message;
        await t.rollback();
    }

}


let quitRepo = async function quitRepo(body) {

    let result;

    await UserWork.update({dateEnd: new Date()}, {
        where: {
            userId:{
                [Op.eq] : body.userId
            },
            workId:{
                [Op.eq] : body.workId
            },
            dateEnd:{
                [Op.eq] : null
            },
        }
    }).then(res => {
        if(res[0] ===1){
            result = "success!"
        }else{
            result = "Can't quit!"
        }
        }).catch((err)=>{
            console.log(err.message)
        });
    return result;

}




module.exports = {
    createRepo,
    quitRepo
}