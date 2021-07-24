<?php
include 'conexao.php';
 //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: *");
 header("Acess-Controll-Allow-Methods: GET,PUT,POST,DELETE");

  //recebe os dados do formulario
$response_json = file_get_contents("php://input");

//é um objeto pra poder ler o valor
$dados =json_decode($response_json,true);

if($dados){
  $query_cliente = "UPDATE pessoa SET nome=:nome, email=:email WHERE id=:id";
  $sql = $conn->prepare($query_cliente);
  $sql->bindParam(':nome',$dados['nome'],PDO::PARAM_STR);
  $sql->bindParam(':email',$dados['email'],PDO::PARAM_STR);
  $sql->bindParam(':id',$dados['id'],PDO::PARAM_INT);
  $sql->execute();
   if($sql->rowCount()){
    $respoonse = [
        "erro" => false,
        "mensagem"=>"Cliente editado com Sucesso! ",
       // "dados"=>$dados
      ];
  }else{
    $respoonse = [
        "erro" => false,
        "mensagem"=>"Erro: Não foi possivel editar! ",
       // "dados"=>$dados
      ];
  }

  //  $respoonse = [
    //    "erro" => false,
     //   "messagem"=>"Cliente editado com Sucesso! ",
       // "dados"=>$dados
     // ];

}else{
   // $respoonse = [
   //     "erro" => false,
   //     "messagem"=>"Erro: Não foi possivel editar! ",
       // "dados"=>$dados
   //   ];
}





//tera a resposta de ok
http_response_code(200);
//converte array em objeto
echo json_encode($respoonse);

