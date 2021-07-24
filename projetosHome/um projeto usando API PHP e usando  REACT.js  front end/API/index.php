
<?php
  //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");

 include 'conexao.php';
//localhost/API/index.php no imsonia
 $sql = "SELECT  id,nome,email FROM pessoa ";
 $res = $conn->prepare($sql);
 $res->execute();

 if(($res) AND ($res->rowCount()!= 0)){
    while($row_pessoa = $res->fetch(PDO::FETCH_ASSOC)){
      // echo"<pre>";
      // var_dump($row_pessoa);
       extract($row_pessoa);
       $lista_pessoa["records"][$id]=[
          'id' => $id,
          'nome'=> $nome,
          'email'=>$email
       ];
   
   }
   //dando a resposta
   http_response_code(200);
   // tranforma a resposta em json
   echo json_encode($lista_pessoa);
 }
 


 ?> 