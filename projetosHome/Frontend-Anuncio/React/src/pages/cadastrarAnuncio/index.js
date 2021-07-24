import React, { useState } from 'react';
import {Button, Container, Form, FormGroup, Input, Label,Alert} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../config/api';
import axios from 'axios';
//sempre letra Maiusculas
export const CadastrarAnuncio = () =>{

//2   //recebe os dados do formulario
// colocar os nome como esta no banco de dados  no (name) e  na hora de receber os dados
 const [anuncio,setAnuncio] = useState({
    titulo:'',
    Descricao:''
 });
// mostra mensagem na tela  
  const [status, setStatus] = useState({
    type:'',
    mensagem:''  
})
 // 3 
 //pegando os valores que ja existe anuncio
 //aqui esta pegando o (name) do formulario
const valorInput = e => setAnuncio({...anuncio,[e.target.name]:e.target.value});
//1
 const cadAnuncio = async (e) =>{
  e.preventDefault();     
 //console.log(anuncio);
 //preapara o cabeçalho
   const headers ={
     'Content-Type':'application/json'
   }
    await axios.post(api +"/cadastrar", anuncio, { headers })
   .then((response)=>{
      //console.log(response.data.message);
      //verifica o error da Api
         if(response.data.error){
            setStatus({
                   type:'error',
                   mensagem:response.data.message  
                  })
       }
       else
         {
          setStatus({
                type:'success',
                mensagem:response.data.message 
               })
       }
      
   })
   .catch((err)=>{
         setStatus({
            type:'error',
            mensagem:'Erro: tente mais tarde'  
       })
    //console.log(err);
    })
  
 }

    return(
        <Container>
             <div className="d-flex">
        <div className="mr-auto p-2">
          <h1>Cadastrar Anúncios</h1>
          <hr/>
        </div>
        <div className="p-2">
          <Link to="/" className="btn btn-outline-info  btn-sm">Listar</Link>
        </div>
     </div>
   
     {status.type==='error'? <Alert color="danger">{status.mensagem}</Alert> : ' '}
     {status.type==='success'? <Alert color="success">{status.mensagem}</Alert> : ' '}
   
   
   
     <Form onSubmit={cadAnuncio}>
       <FormGroup>
         <Label>Titulo:</Label>
         <Input type="text" name="titulo" placeholder=" Titulo do Anúncio.."  onChange={valorInput}/>    
       </FormGroup>

       <FormGroup>
         <Label>Descrição:</Label>
         <Input type="text" name="Descricao" placeholder="descrição do Anúncio.."  onChange={valorInput}/>    
       </FormGroup>

       <Button type="submit" outline color="success">Cadastrar</Button>

  


     </Form>
          
    </Container>
    )
 }