<?php
// google_login.php
require_once __DIR__ . '/vendor/autoload.php';

// PEGA AQUÍ TU CLIENT_ID y CLIENT_SECRET en google_callback.php (NO AQUI)
// Este archivo redirige al flujo de Google
$client = new Google_Client();
$client->setClientId('997121355621-hfit9a796fug6mnmskiu9au08mfselmg.apps.googleusercontent.com
');
$client->setClientSecret('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');
$client->setRedirectUri('http://localhost/kpop/google_callback.php');
$client->addScope('email');
$client->addScope('profile');

$authUrl = $client->createAuthUrl();
header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
exit;
?>
