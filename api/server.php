<?php
define('BP', dirname(__FILE__) . '/');
$route = explode('/', $_SERVER['SCRIPT_NAME']);
$controller = 'customer';
if (!empty($route[1])) {
    $controller = $route[1];
}
if (!file_exists(BP . $controller . '.php')) {
    header("HTTP/1.0 404 Not Found");
    print json_encode(['error' => true, 'error_message' => 'Controller (' . htmlentities($controller) . ') not exists']);
    die();
}

require_once BP . $controller . '.php';