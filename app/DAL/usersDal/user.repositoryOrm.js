const {db} = require("../../models/index");
const Op = db.Sequelize.Op;
const User = db.users;
const WorkUser = db.userWork;
const Work = db.works;
// const {QueryTypes} = require('sequelize');
// const Op = db.Sequelize.Op;




let createRepo = async function createRepo(body) {
    let result;

    await User.create(body).then(data => {
        console.log(data);
        result = data;
    }).catch(err => {
        console.log(err.message);
    });

    return result;
}





let findAllRepo = async function findAllRepo(){
    let result;
     
    await User.findAll()
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
     
      await User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            result= "User was deleted successfully!";
        } else {
            result= `Cannot delete User with id=${id}. User was not found!`;
        }
      })
      .catch(err => {
          result= err.message;
      });

      return result;
}





let updateByIdRepo = async function updateByIdRepo (id, body) { 
    let result;
    await User.update(body , {
        where: {id: id}
    }).then(res => {
        if(res[0] == 1){
            result = "Tutorial was updated successfully.";
        } else {
            result = `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`;
        }
    }).catch (err => {
        result = err.message;
    })
    return result;
}


let getByIdRepo = async function getByIdRepo (id) { 

    let result;
    await User.findByPk(id)
    .then(data => {
      result = data;
    })
    .catch(err => {
      console.log(err.message);
    });
    return result;

}


let getDataRepo = async function getByIdRepo (id) { 

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
            userId: {
                [Op.eq] : id,
            }
            
        }
    }).then(data => {
        console.log(Object.keys(data))
        result= data;
    }).catch(err => {
        console.log('\n'+err.message)
    })

    
    const obj = {};
    await WorkUser.findAll({
        attributes: [ 
            'userId',
            [db.sequelize.fn('sum', db.sequelize.col('salary')), 'sum'],
        ],
        where: {
            dateEnd: {
                [Op.eq] : null,
            },
            userId: {
                [Op.eq]: id,
            }
        },
        group: ['userId'],
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
    