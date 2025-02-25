<?php
declare(strict_types=1);
require_once 'env.php';

$container = new \Api\Utils\Container();
$container->set('Request', function () {
    return $request = new \Api\Utils\Request();
});
$router = new \Api\Utils\Router($container->get('Request'));
\Api\Customer\CustomerRoutes::addRoutes($container, $router);
\Api\Product\ProductRoutes::addRoutes($container, $router);
$router->dispatch($container);