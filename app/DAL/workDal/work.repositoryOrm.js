const {db} = require("../../models/index");
const User = db.users;
const WorkUser = db.userWork;
const Work = db.works;
const Op = db.Sequelize.Op;
// const Op = db.Sequelize.Op;




let createRepo = async function createRepo(work) {
    let result;

    await Work.create(work)
    .then(data => {
        console.log(data);
        result = data;
    })
    .catch(err => {
        console.log(err.message);
    });
    return result;
}





let findAllRepo = async function findAllRepo(){
    let result;
     
    await Work.findAll()
      .then(data => {
        console.log(data);
        result = data;
      })
      .catch(err => {
          console.log(err.message)
      });
      return result;
}




let deleteByIdRepo = async function deleteByIdRepo(id){
    let result;
     
      await Work.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            result= "Work was deleted successfully!";
        } else {
            result= `Cannot delete Work with id=${id}. Work was not found!`;
        }
      })
      .catch(err => {
          result= err.message;
      });

      return result;
}





let updateByIdRepo = async function updateByIdRepo (id, body) { 
    let result;
    await Work.update(body , {
        where: {id: id}
    }).then(res => {
        console.log(id);
        console.log(res[0]);
        if(res[0] == 1){
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
    await Work.findByPk(id)
    .then(data => {
        if(data === null){
            result= 'not found!'
        } else {
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


    await WorkUser.findAll({
        include: [
            {
                model: User,
                required: true,
            },
            {
                model: Work,
                required: true,
            },
        ],
        where: {
            dateEnd: {
                [Op.eq]: null,
            },
            workId: {
                [Op.eq] : id,
            }
            
        }
    }).then(data => {
        // console.log(Object.keys(data))
        result= data;
    }).catch(err => {
        console.log('\n'+err.message)
    })

    
    const obj = {};
    await WorkUser.findAll({
        attributes: [ 
            'workId',
            [db.sequelize.fn('sum', db.sequelize.col('salary')), 'sum'],
        ],
        where: {
            dateEnd: {
                [Op.eq] : null,
            },
            workId: {
                [Op.eq]: id,
            }
        },
        group: ['workId'],
    }).then(data => {
        obj.amount_sal=data[0]["dataValues"]["sum"]
    }).catch(err => {
        console.log(err.message);
    })

    result.push(obj);
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
    