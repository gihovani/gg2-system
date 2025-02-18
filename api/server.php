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
$container->set('CustomerRepositoryInterface', function () {
    return new \Api\Customer\Repositories\JsonCustomerRepository(BP . 'data/customers.json');
});
$container->set('CustomerValidator', function () {
    return new \Api\Customer\Validators\CustomerValidator();
});
$container->set('CustomerController', function () use ($container) {
    $customerRepository = $container->get('CustomerRepositoryInterface');
    $customerValidator = $container->get('CustomerValidator');
    $request = $container->get('Request');
    return new \Api\Customer\Controllers\CustomerController($customerRepository, $customerValidator, $request);
});
$router = new \Api\Utils\Router($container->get('Request'));
$router->addRoute('GET', '/customers', 'CustomerController', 'index');
$router->addRoute('GET', '/customers/{id}', 'CustomerController', 'show');
$router->addRoute('POST', '/customers', 'CustomerController', 'store');
$router->addRoute('POST', '/customers/{id}', 'CustomerController', 'update');
$router->addRoute('DELETE', '/customers/{id}', 'CustomerController', 'destroy');

$router->dispatch($container);