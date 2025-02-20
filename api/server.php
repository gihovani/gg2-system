<?php
declare(strict_types=1);
define('BP', dirname(__FILE__) . '/');

spl_autoload_register(function ($className) {
    $filePath = __DIR__ . '/' . str_replace('\\', '/', $className) . '.php';
    $filePath = str_replace('/Api/', '/', $filePath);
    if (file_exists($filePath)) {
        require_once $filePath;
    }
});
$container = new \Api\Utils\Container();
$container->set('Request', function () {
    return $request = new \Api\Utils\Request();
});
$router = new \Api\Utils\Router($container->get('Request'));
\Api\Customer\CustomerRoutes::addRoutes($container, $router);
\Api\Product\ProductRoutes::addRoutes($container, $router);
$router->dispatch($container);