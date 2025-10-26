<?php
// facebook_login.php
require_once __DIR__ . '/vendor/autoload.php';

$fb = new Facebook\Facebook([
  'app_id' => '31795824173366378',
  'app_secret' => 'ec34d8675123658432e4c26cc7ab5b83',
  'default_graph_version' => 'v20.0',
]);

$helper = $fb->getRedirectLoginHelper();
$permissions = ['email']; 
$loginUrl = $helper->getLoginUrl('http://localhost/kpop/fb_callback.php', $permissions);
header('Location: ' . $loginUrl);
exit;