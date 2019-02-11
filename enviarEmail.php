<?php
  //1 – Definimos Para quem vai ser enviado o email
$para = "felipe.almeida.paes22@gmail.com";
  //2 - resgatar o nome digitado no formulário e  grava na variavel $nome
$nome = $_POST['nome'];
  // 3 - resgatar o email digitado no formulário e grava na variavel //$email
$email = $_POST['email'];

$assunto = "Mensagem enviada pelo formulário do site";


  //4 – Agora definimos a  mensagem que vai ser enviado no e-mail
$mensagem = "<strong>Nome:  </strong>".$nome;
$mensagem .= "<br/><strong>Email: </strong>".$email;
$mensagem .= "<br/><strong>Mensagem: </strong>".$_POST['mensagem'];

  //5 – agora inserimos as codificações corretas e  tudo mais.
  $headers =  "Content-Type:text/html; charset=UTF-8\n";
  $headers .= "From:  dominio.com.br<sistema@dominio.com.br>\n"; //Vai ser //mostrado que  o email partiu deste email e seguido do nome
  $headers .= "X-Sender:  <Juliana-PC.rjo.virtua.com.br>\n"; //email do servidor //que enviou
  $headers .= "X-Mailer: PHP  v".phpversion()."\n";
  $headers .= "X-IP:  ".$_SERVER['REMOTE_ADDR']."\n";
  $headers .= "Return-Path:  <Juliana-PC.rjo.virtua.com.br>\n"; //caso a msg //seja respondida vai para  este email.
  $headers .= "MIME-Version: 1.0\n";

  mail($para, $assunto, $mensagem, $headers);  //função que faz o envio do email.
  echo '<meta http-equiv="refresh" content="5;URL=index.php" />';
  ?>