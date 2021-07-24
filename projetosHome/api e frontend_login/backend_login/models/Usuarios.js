const Sequelize = require('sequelize');
const sequelize = require('./db');
const db = require('./db');

const Usuario = db.define('usuarios',{ //nome da tabela
  id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
        
  },
  nome:{
      type: Sequelize.STRING,
      allowNull:false

  },
  email:{
      type:Sequelize.STRING,
      allowNull:false
  },
  senha:{
      type:Sequelize.STRING,
      allowNull:true
  }
});
//criando a tabela
//caso não exista
//Usuario.sync()

module.exports = Usuario;
