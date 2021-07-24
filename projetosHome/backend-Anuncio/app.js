const express = require('express');
const cors = require('cors');
const Anuncio = require('./models/anuncio');
//require('./models/db');
//const mysql2 = require('mysql2');
const app = express();
app.use(express.json());


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
    app.use(cors())
    next();    
  });
//listar todos
app.get('/',async (req,res)=>{
  // res.send('ola mundo!');
  //ordenando por por id
  await Anuncio.findAll({ order:[['id','DESC']]}).then(function(anuncios){
         //anuncios recebe os dados de anuncios 
    res.json({anuncios:anuncios});
  })
});

//listar um unico registro
app.get('/detalhes/:id', async (req,res)=>{
   // teste pra ver se esta pegando o id
   // res.send("Buscando o id : " +req.params.id);
  await  Anuncio.findByPk(req.params.id).then(anuncio =>{
          return res.json({
              error:false,
              anuncio
          });
    }).catch(function(error){
        return res.status(400).json({
             error:true,
             message:"Erro ao listar os detalhes"
        });
    });
 });
//teste criação da tabela e a insercao de dados automatica
/*
app.get('/cadastrar',async (req,res)=>{
   const resultCad = await Anuncio.create({
       titulo:"Sequelize Api",
       Descricao:"testando MYSQL"
   }).then(function(){
       res.send("Anuncios cadastrado com sucesso!");
   }).catch(function(err){
       res.send("Erro ao cadastrar o Anuncios: "+err);
   }) 
*/
//utilizando o postman
   app.post('/cadastrar',async (req,res)=>{
   const resultCad = await Anuncio.create(req.body)
   .then(function(){
       // res.send("Anuncios cadastrado com sucesso!");
       return res.json({
           error: false,
           message:"Anuncios cadastrado com sucesso!",
       })
    }).catch(function(err){
       // res.send("Erro ao cadastrar o Anuncios: "+err);
        return res.status(400).json({
            error:true,
            message:"Erro ao cadastrar o Anuncios"
        });
    }) 
 });

 //editar
 app.put('/editar',async (req,res)=>{
  await Anuncio.update(req.body,{
      where:{id: req.body.id}
  }).then(function(){
     return res.json({
        error:false,
        message:"anuncio editado com sucesso"
     }); 
  }).catch(function(error){
      return res.json({
         error:true,
         message:"Erro ao Editar" 
      });


    });
 

});

app.delete('/apagar/:id',async (req,res)=>{
 await Anuncio.destroy({
      where:{id: req.params.id}
  }).then(function(){
      return res.json({
          error:false,
          message:"Anuncio Apagado com sucesso!"
      })
  }).catch(function(){
    return res.json({
        error:true,
        message:"Erro  Anuncio nao foi apagado" 
     });    
  });
});


app.listen(8086);