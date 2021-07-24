<?php
 //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 
 include 'conexao.php';
//recebe o id pela URL
 $id =filter_input(INPUT_GET,"id",FILTER_SANITIZE_NUMBER_INT);

 $response ="";

 
 // testa a parte de cima antes de fazer a parte do banco pra deletar

 $query_pessoa = "DELETE FROM pessoa WHERE id=:id LIMIT 1";
 $delete_pessoa = $conn->prepare($query_pessoa);
 $delete_pessoa->bindParam(':id',$id,PDO::PARAM_INT);
 
 if($delete_pessoa->execute()){
     $response =[
         "erro" => false,
         "mensagem" => "Cliente apagado com sucesso!"
    
     ];
 }else{
     $response =[
         "erro" => true,
         "mensagem" => "Cliente não apagado com sucesso!"
    
     ];
 }
  //array
 //$response =[
   //  "erro" => false,
   //  "mensagem" => "Cliente apagado com sucesso! $id"

 //];
 // retorna o valor
 http_response_code(200);

 //retorna um objeto
 echo json_encode($response);

 
 



 ?>