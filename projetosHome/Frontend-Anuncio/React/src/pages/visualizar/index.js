import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'reactstrap';
import api from '../../config/api';

export const VisualizarAnuncio = (props) =>{//recebendo o id da pagina home
 // console.log(props.match.params.id)
  const [data , setData]= useState([]);
  const [id]= useState(props.match.params.id);// vindo da pagina home

  useEffect(()=>{
   const pegandoAnuncio = async () =>{
          await axios.get(api +'/detalhes/'+ id)
          .then((response)=>{
           // console.log(response.data.anuncio);
            setData(response.data.anuncio)
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
          <h1>Visualizar Anúncios</h1>
        </div>
        <div className="p-2">
       <Link to="/" className="btn btn-outline-info  btn-sm">Listar</Link>
       <Link to={"/editar-anuncio/"+ data.id} className="btn btn-outline-warning  btn-sm m-2"  color="info" >Editar</Link>


        </div>
     </div>
     <hr/>
     <dl className="row">
             <dt className="col-sm-3">ID</dt>
             <dd className="col-sm-9">{data.id}</dd>  

             <dt className="col-sm-3">Titulo</dt>
             <dd className="col-sm-9">{data.titulo}</dd>  

             <dt className="col-sm-3">Descrição</dt>
             <dd className="col-sm-9">{data.Descricao}</dd>  
              
        </dl>
          
        </Container>
    )
 }