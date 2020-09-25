const {db} = require("../app/models/index");
const fs = require('fs');


db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });


  let resultT = [];


  let a = async function aaa() {
    let after;
    let before = new Date();
    let dataR;
     await db.sequelize.query(
        `
                select * from users limit 10000;
        `
    ).then(data => {
      dataR = data;
        after = new Date();
        resultT.push(after-before);
    }).catch (err => {
        console.log(err.message);
    })

    return dataR;
  };



  function exec(){
    let arr = [];
    for(let i =0; i<1000; i++){
        let prom = a();
        arr.push(prom);
    };
    return arr;
}


function promAll(){
  let arr = exec();
  Promise.all(arr).then(data => {
      console.log(data);
      console.log(resultT);
      let valueR =  resultT.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    console.log(valueR);
    fs.writeFile("readme.md", `${resultT} \n Average value: ${valueR/resultT.length}`, function(error){
      if(error) throw error; // если возникла ошибка
  });
  });

}

 promAll();
