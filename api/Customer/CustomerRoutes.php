<?php
declare(strict_types=1);

namespace Api\Customer;

use Api\Base\RoutesInterface;
use Api\Utils\Container;
use Api\Utils\Router;

class CustomerRoutes implements RoutesInterface
{
    public static function addRoutes(Container $container, Router $router)
    {
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
        $router->addRoute('GET', '/customers', 'CustomerController', 'index');
        $router->addRoute('GET', '/customers/{id}', 'CustomerController', 'show');
        $router->addRoute('POST', '/customers', 'CustomerController', 'store');
        $router->addRoute('POST', '/customers/{id}', 'CustomerController', 'update');
        $router->addRoute('DELETE', '/customers/{id}', 'CustomerController', 'destroy');
    }
}