const Sequelize =  require('sequelize');
const sequelize = require('./db');
const db = require('./db');


const Anuncio =db.define('anuncios',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    titulo:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    Descricao:{
        type:Sequelize.TEXT,
        allowNull:false,
    }
});
//cria a tabela
// antes de cadastrar o segundo desativa essa opcao 
//Anuncio.sync({force:true});
//depois deixe assim 
Anuncio.sync();
module.exports = Anuncio;