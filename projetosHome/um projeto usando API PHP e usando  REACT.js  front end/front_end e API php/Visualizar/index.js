import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export const Detalhes = (props) =>{

    const [data, setData]=useState([]);
    // id recuperado dos link index.js
    const [id] = useState(props.match.params.id);
    
      useEffect(()=>{
         const buscarCliente = async () =>{
             await fetch("http://localhost/API/visualizar.php?id=" + id)
             .then((response)=> response.json())
             .then((responseJson)=>{
                // console.log(responseJson);
                setData(responseJson.cliente);
             })
         } 
        buscarCliente();
      },[id]);

    return(
        <div className="container">
            <h1 className="text-center">Detalhe do Cliente</h1>
            <Link to="/" >Voltar</Link>
               <hr />
            <p>ID :{data.id}</p>
            <p>NOME :{data.nome}</p>
            <p>EMAIL : {data.email}</p>
        </div>
    )
       
    


} 