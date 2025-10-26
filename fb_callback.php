<?php
// fb_callback.php
session_start();
require_once __DIR__ . '/vendor/autoload.php';
include 'conexion.php';

$fb = new Facebook\Facebook([
  'app_id' => '31795824173366378',
  'app_secret' => 'ec34d8675123658432e4c26cc7ab5b83',
  'default_graph_version' => 'v20.0',
]);

$helper = $fb->getRedirectLoginHelper();

try {
  $accessToken = $helper->getAccessToken();
} catch (Facebook\Exceptions\FacebookResponseException $e) {
  echo "<script>alert('Error de Graph: ".addslashes($e->getMessage())."'); window.location='login.html';</script>";
  exit;
} catch (Facebook\Exceptions\FacebookSDKException $e) {
  echo "<script>alert('Error de SDK: ".addslashes($e->getMessage())."'); window.location='login.html';</script>";
  exit;
}

if (!isset($accessToken)) {
  echo "<script>alert('No se obtuvo token de acceso.'); window.location='login.html';</script>";
  exit;
}

$oAuth2Client = $fb->getOAuth2Client();
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
$tokenMetadata->validateAppId('31795824173366378');

try {
  $response = $fb->get('/me?fields=id,name,email', $accessToken);
} catch (Exception $e) {
  echo "<script>alert('No se pudo obtener datos del usuario: ".addslashes($e->getMessage())."'); window.location='login.html';</script>";
  exit;
}

$userNode = $response->getGraphUser();
$nombre   = $conn->real_escape_string($userNode->getName() ?: 'fb_user');
$email    = $conn->real_escape_string($userNode->getEmail() ?: ($userNode->getId().'@facebook.com'));
$usuario  = $conn->real_escape_string('fb_'.$userNode->getId());

// Insertar si no existe
$check = $conn->prepare("SELECT id FROM usuarios WHERE email=?");
$check->bind_param('s', $email);
$check->execute();
$check->store_result();

if ($check->num_rows === 0) {
  // password vacío porque es login social
  $pwd = '';
  $ins = $conn->prepare("INSERT INTO usuarios (nombre, usuario, email, password) VALUES (?,?,?,?)");
  $ins->bind_param('ssss', $nombre, $usuario, $email, $pwd);
  $ins->execute();
  $ins->close();
}
$check->close();

$_SESSION['usuario'] = $usuario;
$_SESSION['nombre']  = $nombre;

echo "<script>alert('Bienvenido $nombre'); window.location='index.html';</script>";