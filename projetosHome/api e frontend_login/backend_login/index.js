const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {promisify}= require('util');
const mysql = require('mysql2');
//pra criptografar senha
const bcrypt = require('bcryptjs');

app.use(express.json());
//midle sera executado primeiro
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
})
app.get('/',function(req,res){
  return  res.json({
        Erro: false,
        messagem:'pagina inicial!'
    });

})
//caso esteja tudo  funcionando a senha e username tera que inserir um novo token 
app.get('/sistema',validartoken,function(req,res){
        res.json({
        Erro: false,
        messagem:'Listar Usuarios !'
    });
})

const db = require('./models/db');
const Usuario = require('./models/Usuarios');
//Criando  rota pra cadastrar
app.post('/usuario', async (req,res) =>{
 // return res.json({
   // dados:req.body,
 // });
  var dados = req.body;
  dados.senha =  await bcrypt.hash(dados.senha,8)//criptografa senha
  await Usuario.create(dados).then(function(){
    return  res.json({
      Erro: false,
      messagem:'Usuário cadastrado com sucesso!'
      });
  }).catch(function(){
    return  res.json({
      Erro: true,
      messagem:'Error: Usuário não cadastrado com sucesso!'
      });
  })

});
//lista todos usuarios precisa do token tambem
app.get('/usuarios',validartoken, async function (req,res){
 await Usuario.findAll({order:[['id','DESC']]}).then(function(usuario){
  return  res.json({
    Erro: false,
    usuario
    });
  }).catch(function(){
        return  res.json({
            Erro: true,
            messagem:'Error: Nenhum Usuário encontrado!'
            });

   })

})
//aqui no caso tera que colocar o token pra poder visualiza um detalhe do registro
app.get('/usuario/:id',validartoken,async(req,res)=>{
  await Usuario.findByPk(req.params.id).then(usuario=>{
    return  res.json({
      Erro: false,
      usuario
      });
  }).catch(function(){
    return  res.json({
      Erro: true,
      messagem:'Error:usuário não encontrado!'
      });
  });
});

//editar usuarios colocar se token tambem pra poder editar
app.put('/usuario',validartoken, async (req,res) =>{
 var dados = req.body //pegando os dados que esta em cadastrar adiciona id e o token
 //criptografar senha
 dados.senha = await bcrypt.hash(dados.senha,8)
                      //pega os dados onde id = dados.id
 await Usuario.update(dados,{where:{id: dados.id}}).then(function(){
  return  res.json({
    Erro: false,
    messagem:'usuário Editado com sucesso !'
    });
 }).catch(function(){
  return  res.json({
    Erro: true,
    messagem:'Erro :Não foi possivel editar usuário!'
    });
 }); 

});
//apagar colocar se token tambem pra poder Apagar 
app.delete('/usuario/:id',validartoken, async (req,res)=>{
  await Usuario.destroy({where:{id: req.params.id}}).then(function(){
    return  res.json({
      Erro: false,
      messagem:'usuário Apagado com sucesso !'
      });
  }).catch(function(){
    return  res.json({
      Erro: true,
      messagem:'Erro :Não foi possivel Apagar o usuário!'
      });
  })
})






app.post('/login',async(req,res) =>{
  //verifica se existe email no banco
  //faltou validar senha pelo banco
  const usuario = await Usuario.findOne({where:{email:req.body.usuario}})
   if(usuario=== null)
   {
     return  res.json({
       Erro: true,
       messagem:'Error:Usuário não encontrado!'
       });
   }
  // a aqui esta com validação senha não é do banco de dados 
    if(req.body.usuario === "rafamergulha@hotmail.com" && req.body.senha==="1234")
  {
  const {id} =1;
  var privateKey ="e81d9b3c3c57393453c8";
  var token = jwt.sign({id},privateKey,{
    expiresIn:600//10 min
  })
     return res.json({
       Erro: false,
       messagem:'Login Realizado com sucesso!',
       dados: req.body,
       token:token
     //token
     });
 }else{
  return res.json({
    Erro:true,
    messagem:'Senha ou Login Invalido!',
  
  });
 }
   
  
})

// valida token
async function validartoken(req,res,next){
//return res.json({messagem:'testando token'})
const autorizacao = req.headers.authorization
const [, token] = autorizacao.split(' ');

//verifica se token existe
if(!token){
  return res.json({
       error:true,
       messagem:'Error :Necessário realizar o login pra acessar a pagina!'
      })
}//else{
  // res.json({
  //  error:false,
  //  messagem:'token encontrado com sucesso !',
  //  token
  // })
  try{
    //validando token
    const decode = await promisify(jwt.verify)(token,'e81d9b3c3c57393453c8');
    req.userId = decode.id;  
   return next();// seria pra entra na rota ('/usuario')
  }catch(err)
  {
    return res.json({
      error:true,
      messagem:'Error : login ou senha invalida!'
     })
  }
//}
//return res.json({token })




}
 




app.listen(3333,function(){
  console.log('servidor rodando !');
})



