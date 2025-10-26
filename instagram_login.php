<?php
// instagram_login.php
// Este archivo redirige al flujo de autorización de Instagram Basic Display API.
// PEGA AQUÍ TU CLIENT_ID en ig_callback.php
$client_id = 'YOUR_INSTAGRAM_CLIENT_ID';
$redirect_uri = 'http://localhost/kpop/ig_callback.php';
$scope = 'user_profile';

$url = "https://api.instagram.com/oauth/authorize?client_id=$client_id&redirect_uri=$redirect_uri&scope=$scope&response_type=code";
header('Location: ' . $url);
exit;
?>