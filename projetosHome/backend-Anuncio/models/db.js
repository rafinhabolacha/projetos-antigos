const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs','root','',{
    host:'localhost',
    dialect:'mysql'
});

//sequelize.authenticate()
//.then(function(){
//    console.log("conectado com sucesso!")
//}).catch(function(err){
//    console.log("erro ao se conectar"+err);
//})

module.exports = sequelize;