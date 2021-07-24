import React, {useState,useEffect} from 'react';
import axios from 'axios';
import api from '../../config/api';
import {Container,Button,Alert,Form, FormGroup, Input, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
export const EditarAnuncio = (props) =>{

  //const [data , setData]= useState([]);
  const [id]= useState(props.match.params.id);
  
  //no editar acrecenta essas duas linha
  const [titulo,setTitulo] = useState('');
  const [descricao,setDescricao] = useState('');
  
  
  //console.log(id);
  

  const [status, setStatus] = useState({
   type:'',
   mensagem:''  
})

 const EditAnuncio =  async (e)=>{
      e.preventDefault();
     // console.log("titulo " + titulo);
  // enviar pra api

   const headers={
    'Content-Type':'application/json'
   }

   await axios.put(api +"/editar",{id,titulo,descricao},{headers})
   .then((response)=>{
    // console.log(response.data.error);
     //console.log(response.data.message);
        if(response.data.error){
          setStatus({
            type:'error',
            mensagem: response.data.message  
           });


        }else{
          setStatus({
            type:'success',
            mensagem: response.data.message   
           })
        } 



   })
   .catch(()=>{
    setStatus({
      type:'error',
      mensagem:'Erro: tente mais tarde'  
     })
   })



 }
 useEffect(()=>{
   const pegandoAnuncio = async () =>{
          await axios.get(api +'/detalhes/'+ id)
          .then((response)=>{
          // console.log(response.data.anuncio);
          
            //setData(response.data.anuncio)
            //acrescenta titulo e Descrição
            setTitulo(response.data.anuncio.titulo);
            setDescricao(response.data.anuncio.Descricao);

          })
          .catch(()=>{
            console.log("Erro tente mais tarde");
          })
    }
    pegandoAnuncio(); 
  },[id]);
   return(
    <Container>
      <div className="d-flex">
         <div className="mr-auto p-2">
             <h1>Editar o Anúncios</h1>
         </div>
         <div className="p-2">
        <Link to="/" className="btn btn-outline-primary   btn-sm" >Listar</Link>
        <Link to={"/visulaizar-anuncio/"+id} className="btn btn-outline-warning  btn-sm m-2"  color="info" >Visualizar</Link>
       </div>
     </div>
     {status.type==='error'? <Alert color="danger">{status.mensagem}</Alert> : ' '}
     {status.type==='success'? <Alert color="success">{status.mensagem}</Alert> : ' '}

     <Form onSubmit={EditAnuncio}>
       <FormGroup>
         <Label>Titulo:</Label>
         <Input type="text" 
         name="titulo" 
         placeholder="novo titulo" 
         value={titulo}
onChange={e=>setTitulo(e.target.value)}

         />    
       </FormGroup>

       <FormGroup>
         <Label>Descrição:</Label>
         <Input type="text"
          name="Descricao" 
          placeholder="novo  Anúncio.." 
          value={descricao}
          onChange={e=>setDescricao(e.target.value)}

          />
       </FormGroup>
       <Button type="submit" outline color="warning">Salvar</Button>
     </Form>
 </Container>
    )
 }