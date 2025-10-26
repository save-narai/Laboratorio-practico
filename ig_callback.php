<?php
// ig_callback.php
include('conexion.php');
session_start();

// PEGA AQUÍ TU CLIENT_ID y CLIENT_SECRET
$client_id = 'YOUR_INSTAGRAM_CLIENT_ID';
$client_secret = 'YOUR_INSTAGRAM_CLIENT_SECRET';
$redirect_uri = 'http://localhost/kpop/ig_callback.php';

if (!isset($_GET['code'])) {
    header('Location: login.html');
    exit;
}

$code = $_GET['code'];
$token_url = 'https://api.instagram.com/oauth/access_token';

$data = [
  'client_id' => $client_id,
  'client_secret' => $client_secret,
  'grant_type' => 'authorization_code',
  'redirect_uri' => $redirect_uri,
  'code' => $code
];

$options = [
  'http' => [
    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
    'method'  => 'POST',
    'content' => http_build_query($data),
  ],
];
$context  = stream_context_create($options);
$response = file_get_contents($token_url, false, $context);
$result = json_decode($response, true);

if (empty($result) || !isset($result['access_token'])) {
    echo "<script>alert('Error al obtener token de Instagram'); window.location='login.html';</script>";
    exit;
}

$access_token = $result['access_token'];
$user_id = $result['user_id'];

// Obtener información pública del usuario
$user_info = file_get_contents("https://graph.instagram.com/{$user_id}?fields=id,username&access_token={$access_token}");
$user = json_decode($user_info, true);

$nombre = $conn->real_escape_string($user['username'] ?? 'insta_user');
$email = $nombre . '@instagram.com';

$check = $conn->query("SELECT * FROM usuarios WHERE email='$email'");
if ($check->num_rows == 0) {
    $conn->query("INSERT INTO usuarios (nombre, usuario, email, password) VALUES ('$nombre', '$nombre', '$email', '')");
}

$_SESSION['usuario'] = $nombre;
echo "<script>alert('Bienvenido $nombre'); window.location='index.html';</script>";
?>