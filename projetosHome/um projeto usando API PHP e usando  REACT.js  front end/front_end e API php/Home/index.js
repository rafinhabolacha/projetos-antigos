import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Home/home.css';
export const Home = ()=> {
  
  const [data , setData]=useState([]);


  const  getPessoa = async ()=>{
   // console.log("listar Pessoa");
    fetch("http://localhost/API/index.php")
    .then((response) => response.json())
    .then((responsejson)=>(
        //console.log(responsejson),   
        setData(responsejson.records)  
    ));


  }
//http://localhost/API/
  useEffect(()=>{
   getPessoa();
  },[])// evitar fica fazendo  requisicões toda hora
  
  return (
  <div className="container">
    <div className="row">
       <h1 className=" titulo " >Listar  Contatos</h1>
           <table className=" table-hover ">
             <thead >
                 <tr className="cor_tabela">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Açoes</th>
                </tr>
             </thead>
              <tbody>
                {Object.values(data).map(pessoa =>(
                    <tr  key={pessoa.id}>
                        <td>{pessoa.id}</td>
                        <td>{pessoa.nome}</td>
                        <td>{pessoa.email}</td>
                        <td>
                  <Link
                 style={{color:'blue',
                         padding:'20px',
                         borderRadius:'3px', 
                         textDecoration:'none',
                        }} 
                  to={"/visualizar/" + pessoa.id}>Visualizar
                  </Link>
                   <Link
                 style={{color:'orange',
                          padding:'20px',
                          borderRadius:'3px',
                          textDecoration:'none',
                        }} 
                  to={"/editar/" + pessoa.id}>Editar
                  </Link> 
                  
                  <Link
                 style={{color:'red',
                         padding:'20px',
                         borderRadius:'3px',
                         textDecoration:'none',
                        }} 
                  to={"/visualizar/" + pessoa.id}>Apagar</Link> 
                  
                    </td>
                    </tr>
                ))}
             </tbody>
          </table>
     </div>
   </div>
  );
}


