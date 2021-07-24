const {Sequelize}  = require('sequelize');

const sequelize  = new Sequelize('login','root','',{
    host:'localhost',
    dialect:'mysql'
});

sequelize.authenticate().then(function(){
   console.log("conexão realizada com sucesso");
}).catch(function(err){
  console.log("Erro :conexão nao realizada com sucesso!");
});

module.exports = sequelize;