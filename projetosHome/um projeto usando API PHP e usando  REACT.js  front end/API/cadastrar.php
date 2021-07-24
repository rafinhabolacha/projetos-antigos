<?php
//http://localhost/API/cadastrar.php usada no postman  pra fazer POST
include 'conexao.php';
 //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: *");
 header("Acess-Controll-Allow-Methods: GET,PUT,POST,DELETE");

 //recebe os dados do formulario
$response_json = file_get_contents("php://input");
// um objeto pra poder ler o valor
$dados =json_decode($response_json,true);
// faz o teste no postman  e sera retornado o nome
//echo json_encode($dados['nome']);
//aqui recebera todos
//echo json_encode($dados);
//tera a resposta de ok
http_response_code(200);
if($dados)
  {
    
   // na hora de fazer teste utiliza no insonia
   /*
    {
     url = localhost/API/cadastrar.php   
      "cliente":{
         "nome":"maria",
         "email":"maria@hotmail.com"
         }
    }
   */


     // var_dump($dados);
      $sql = "INSERT INTO pessoa (nome, email)VALUES(:nome, :email)";
      $cad_Cliente = $conn->prepare($sql);
                                           //no front end vem cliente:{}
        $cad_Cliente->bindParam(':nome',$dados['cliente']['nome']);
        $cad_Cliente->bindParam(':email',$dados['cliente']['email']);
        $cad_Cliente->execute();
 //verificar se gravou
    if($cad_Cliente->rowCount())
   {
        $response = [
                //houve error?
                //false = não houve
                "error" => false,
                "messagem"=>"Cliente cadastrado com Sucesso!"
         ];    
   }
   else
      {
         $response = [
                //houve error?
            //true = sim houve
        "error"=>true,
        "messagem"=>"Cliente nao cadastrado com Sucesso!"
        ];

      }
        //resposta 200 = ok
        http_response_code(200);
        //retorna  em formato json
        echo json_encode($response);
   }
  else
     {
        $response=[
                //houve error?
            //true = sim houve
            'error' => true,
           'messagem' =>'dados não enviado com Sucesso!'
        
         ];
         
     }
 // http_response_code(200);
 // echo json_encode($response);


  
?>