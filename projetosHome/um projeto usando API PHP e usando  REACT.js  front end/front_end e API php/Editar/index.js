import React, {useState,useEffect} from 'react'


export const Editar = (props)=> {
    //const [data, setData]=useState([]);
    // id recuperado dos link index.js
    const [id] = useState(props.match.params.id);
    //seta um de cada vez
    const [nome , setNome]=useState('');
    const [email, setEmail]=useState('');

   
    const [status, setStatus]=useState({
        type:'',
        mensagem:''
      })





 const editCliente = async e =>{
     e.preventDefault();
     //console.log(nome);
       await fetch("http://localhost/API/editar.php",{
           method:"POST",
           headers:{
               'Content-Type':'Application/json'
           },
             body:JSON.stringify({id,nome,email})    
       }).then((response)=>response.json())
         .then((responseJson)=>{
             console.log(responseJson);
            if(responseJson.error){
                setStatus({
                    type:'error',
                    mensagem:responseJson.mensagem 
                })
            }else{
                setStatus({
                    type:'Success',
                    mensagem:responseJson.mensagem 
                });
            } 
         }).catch(()=>{
            setStatus({
                type:'error',
                mensagem:'não foi possivel editar cliente, tente mais tarde !'
            })
         }) 

 }
  
      useEffect(()=>{
         const buscarCliente = async () =>{
             await fetch("http://localhost/API/visualizar.php?id=" + id)
             .then((response)=> response.json())
             .then((responseJson)=>{
                 console.log(responseJson);
               // setData(responseJson.cliente);
               setNome(responseJson.cliente.nome)
               setEmail(responseJson.cliente.email)
             })
         } 
        buscarCliente();
      },[id]);
   return(
       <div className="container">
           <h1>Editar Clientes</h1>
           {status.type === 'Error' ? 
     <p style={{background:'#ccc',color:'red'}}>
       {status.mensagem}</p>:''}

     {status.type === 'Success' ? 
     <p style={{background:"#ccc",color:'green',padding:'5px',borderRadius:'5px'}} >
     {status.mensagem}</p>:''} 
         







           <form onSubmit={editCliente}>
    <label htmlFor="">Nome:</label><br/>
    <input 
    type="text"
    name="nome" 
    placeholder="...Novo nome" 
     value={nome}
     onChange={e => setNome(e.target.value)}
     />
      
    <br/><br/>

   <label htmlFor="">E-mail:</label><br/>
   <input 
   type="email"
   name="email" 
   placeholder="novo E-mail..."
   value={email}
   onChange={e =>setEmail(e.target.value)}
   />
   <br/><br/>
    <input type="submit" value="Editar" />
   </form>
   
       </div>
   )
}