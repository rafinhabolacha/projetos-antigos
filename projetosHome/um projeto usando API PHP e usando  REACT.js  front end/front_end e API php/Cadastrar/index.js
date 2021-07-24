import React,{useState} from 'react';
export const Cadastrar = ()=> {
   const [cliente,setCliente]= useState({
       nome:'',
       email:''
   });
  const [status, setStatus]=useState({
    type:'',
    messagem:''
  })
    const cadCliente = async e =>{
       e.preventDefault();
     // console.log(cliente.nome); 
     
  await fetch("http://localhost/API/cadastrar.php",{
          method:'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'

                 },
                 
               body:JSON.stringify({cliente})
            
      })
      //console.log(cliente)
      .then((response)=>response.json())
      .then((responsejson)=>{
        
    if(!responsejson.error)
    {
      console.log(responsejson)
     setStatus({
          type:'Success',
          messagem:responsejson.messagem
        })

     }
     else
     {
      console.log(responsejson)
       setStatus({
          type:'Error',
          messagem: responsejson.messagem
        })
     }

      }).catch(()=>{
          setStatus({
          //caso não tenha conectado com API
          type:'Error',
          messagem:'falha tente mais tarde!'
        })
      })

      }

   


  //name do campo  e o value = ao valor do name , setando o cliente que contem o nome e email
   const valorInput = e => setCliente({ ...cliente,[e.target.name]:e.target.value});
 
  return (
  <div className="container">
   

      <h1>Cadastrar</h1>
             
     {status.type === 'Error' ? 
     <p style={{background:'#ccc',color:'red'}}>
       {status.messagem}</p>:''}

     {status.type === 'Success' ? 
     <p style={{background:"#ccc",color:'green',padding:'5px',borderRadius:'5px'}} >
     {status.messagem}</p>:''} 
     <hr />           
     <form  onSubmit={cadCliente} >
    <label htmlFor="">Nome:</label><br/>
    <input 
    type="text"
    name="nome" 
    placeholder="Nome completo ..." 
    onChange={valorInput}/>
    <br/><br/>

   <label htmlFor="">E-mail:</label><br/>
   <input 
   type="email"
   name="email" 
   placeholder="E-mail valido...."
   onChange={valorInput}/>
   <br/><br/>
    <input type="submit" value="cadastrar" />
   </form>
   
      
   </div>
  );
}





 //console.log(cliente)
 //.then((response)=>response.json())
 //.then((responsejson)=>(
 //    console.log(responsejson)
 //))