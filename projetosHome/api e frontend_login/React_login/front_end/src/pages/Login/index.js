import React,{ useState } from 'react';
import axios from 'axios';
import {api} from '../../config/services'
import {useHistory} from 'react-router-dom';
export const Login = ()=> {
  
  // pra direcionar pra outra pagina
  const history = useHistory();

  const [dadosUsuario,setUsuario ] =useState({
    usuario:'',
    senha:''
  });
  
  const [status,setStatus] = useState({
        type:'',
        messagem:''
  });

  const valorInput = e =>setUsuario({...dadosUsuario,[e.target.name]: e.target.value})


  const loginSubmit = async e =>{
    e.preventDefault();
   //console.log(dadosUsuario.usuario);

  const headers ={
    'Content-Type':'Application/json'
  }

   axios.post(api + "/login",dadosUsuario,{headers})
   .then((response)=>{
     console.log(response.data.Erro);
     console.log(response.data.messagem);
     console.log(response.data.token);
    if(response.data.Erro)
    {
        setStatus({
          type:"error",
          messagem:response.data.messagem
        })
    }
    else
    {
        setStatus({
          type:"Success",
          messagem:response.data.messagem
        });
        
        //direciona pra outra pagina
        return history.push('/home');
    }
   }).catch(()=>
   {
          setStatus({
            type:"error",
            messagem:'Error: Usuário ou senha incorreta!'
          });   
     
   });

  }

  return (
  <div className="container">
   <h1>Login:</h1>

{status.type === 'error'? <p>{status.messagem}</p> : ""}
{status.type === 'Success'? <p>{status.messagem}</p> : ""}


     <form onSubmit={loginSubmit}>
       <label htmlFor="usuario">Usuário:</label>
       <input 
       type="text" 
       name="usuario" 
       placeholder="digite o usuário"
       onChange={valorInput}
       /><br/><br/>
       <label htmlFor="senha">Senha:</label>
       <input type="password" name="senha" placeholder="digite a senha"
        onChange={valorInput}
       /><br/><br/>
      <button type="submit" >Acessar</button>
    </form>
   </div>
  );
}





 //console.log(cliente)
 //.then((response)=>response.json())
 //.then((responsejson)=>(
 //    console.log(responsejson)
 //))