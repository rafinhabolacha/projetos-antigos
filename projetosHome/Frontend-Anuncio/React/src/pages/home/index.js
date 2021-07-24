import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container,Table,Alert } from 'reactstrap';
import api from '../../config/api';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [data,setData] = useState([]);
  const [status, setStatus] = useState({
       type:'',
       mensagem:''  
  })
  const pegarAnuncios = async () =>{
      await axios.get(api) // no caso é a raiz ('/');
      .then((response)=>{
       // console.log(response.data.anuncios);
        setData(response.data.anuncios);
      })
      .catch(()=>{
       // console.log("Erro: tente mais tarde ");
        setStatus({
          type:'error',
          mensagem:'Erro: tente mais tarde'  
       })
    })
 }

  useEffect(()=>{
    pegarAnuncios();
  },[]);



  const ApagarAnuncio =  async (idAnuncio) =>{
      // console.log(idAnuncio);

      const headers ={
        'Content-Type':'application/json'
      }


      await axios.delete(api + "/apagar/" + idAnuncio ,{headers})
      .then((response)=>{
         if(response.data.error){
          setStatus({
            type:'error',
            mensagem: response.data.message
         })
         }else{
          setStatus({
            type:'success',
            mensagem: response.data.message
         });
         pegarAnuncios();
         }
      })
      .catch(()=>{
        setStatus({
          type:'error',
          mensagem:'Erro: tente mais tarde'  
       })
    })
  }

  return (
    <Container>
      <div className="d-flex">
        <div className="mr-auto p-2">
          <h1>Anúncios</h1>
        </div>
        <div className="p-2">
          <Link to="/cadastrar-anuncio" className="btn btn-outline-success  btn-sm">Cadastrar</Link>
        </div>
      </div>
 {status.type==='error'? <Alert color="danger">{status.mensagem}</Alert> : ' '}
 {status.type==='success'? <Alert color="success">{status.mensagem}</Alert> : ' '}     
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th className="text-center">Acões</th>
          </tr>
        </thead>
          <tbody>
            {data.map(item =>(
               <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td className="text-center">
                    

 <Link to={"/visulaizar-anuncio/"+ item.id} className="btn btn-outline-primary  btn-sm" >Visualizar</Link>

 <Link to={"/editar-anuncio/"+ item.id} className="btn btn-outline-warning  btn-sm m-2"  color="info" >Editar</Link>

 <span className="btn btn-outline-danger btn-sm mr-1" onClick={()=>ApagarAnuncio(item.id)} >Apagar</span>
                  </td>
               </tr>
            ))}
           
          </tbody> 
        </Table>


        </Container>
    )
 }
