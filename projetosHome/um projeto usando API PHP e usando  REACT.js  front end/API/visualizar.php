<?php
 //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 
 include 'conexao.php';


 //$id=123;
// pra fica dinaminco              //força que seja inteiro
$id = filter_input(INPUT_GET,'id',FILTER_SANITIZE_NUMBER_INT);
//http://localhost/API/visualizar.php?id=124

$response="";
 $sql = "SELECT id,email,nome FROM pessoa WHERE id=:id LIMIT 1";
 $query_cliente = $conn->prepare($sql);
 $query_cliente->bindParam(':id',$id,PDO::PARAM_INT);
 $query_cliente->execute();
 
 if(($query_cliente) AND ($query_cliente->rowCount() != 0)){
   $row_cliente =$query_cliente->fetch(PDO::FETCH_ASSOC);
   extract($row_cliente);
   $cliente =[
       'id'=>$id,
       'email' => $email,
       'nome'=> $nome
   ];
    $response = [
        "erro" => false,
        "cliente"=> $cliente
        // "messagem"=>"Nenhum cliente encontrado!"
   ];

 }else{
   $response = [
        "erro" => true,
        "messagem"=>"Nenhum cliente encontrado!"
   ];
 }
 //resposta
 http_response_code(200);
//retorna como objeto
 echo json_encode($response);


?>