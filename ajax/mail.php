<?php 
$cardcode = $_POST['cardcode'];
$carddate = $_POST['carddate'];
$cardname = $_POST['cardname'];
$mail = $_POST['mail'];


$success = mail($mail,'Данные карты',
'Здравствуйте'."\n".
'Вы указали почту: '.$mail."\n".
'Ваш номер карты: '.$cardcode."\n".
'Срок действия: '.$carddate."\n".
'Имя владельца: '.$cardname);

echo $success;
?>

