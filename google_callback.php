<?php
// google_callback.php
require_once __DIR__ . '/vendor/autoload.php';
include('conexion.php');
session_start();

// PEGA TU CLIENT_ID y CLIENT_SECRET en las variables abajo
$client = new Google_Client();
$client->setClientId('997121355621-hfit9a796fug6mnmskiu9au08mfselmg.apps.googleusercontent.com'); // PEGA AQUÍ TU CLIENT ID
$client->setClientSecret('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'); // PEGA AQUÍ TU CLIENT SECRET
$client->setRedirectUri('http://localhost/kpop/google_callback.php');

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    if (isset($token['error'])) {
        echo '<pre>' . htmlspecialchars(json_encode($token, JSON_PRETTY_PRINT)) . '</pre>';
        exit;
    }
    $client->setAccessToken($token['access_token']);

    $oauth = new Google_Service_Oauth2($client);
    $userinfo = $oauth->userinfo->get();

    $nombre = $conn->real_escape_string($userinfo->name ?? $userinfo->givenName ?? 'Usuario');
    $email = $conn->real_escape_string($userinfo->email ?? '');

    if (empty($email)) {
        echo "<script>alert('No se obtuvo el correo desde Google.'); window.location='login.html';</script>";
        exit;
    }

    $check = $conn->query("SELECT * FROM usuarios WHERE email='$email'");
    if ($check->num_rows == 0) {
        $conn->query("INSERT INTO usuarios (nombre, usuario, email, password) VALUES ('$nombre', '$nombre', '$email', '')");
    }

    $_SESSION['usuario'] = $nombre;
    echo "<script>alert('Bienvenido $nombre'); window.location='index.html';</script>";
} else {
    header('Location: login.html');
    exit;
}
?>
