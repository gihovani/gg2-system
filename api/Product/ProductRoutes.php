<?php
declare(strict_types=1);

namespace Api\Product;

use Api\Base\RoutesInterface;
use Api\Utils\Container;
use Api\Utils\Router;

class ProductRoutes implements RoutesInterface
{
    public static function addRoutes(Container $container, Router $router)
    {
        $container->set('ProductRepositoryInterface', function () {
            return new \Api\Product\Repositories\JsonProductRepository(DATABASE_PRODUCTS);
        });
        $container->set('ProductValidator', function () {
            return new \Api\Product\Validators\ProductValidator();
        });
        $container->set('ProductController', function () use ($container) {
            $customerRepository = $container->get('ProductRepositoryInterface');
            $customerValidator = $container->get('ProductValidator');
            $request = $container->get('Request');
            return new \Api\Product\Controllers\ProductController($customerRepository, $customerValidator, $request);
        });
        $router->addRoute('GET', '/products', 'ProductController', 'index');
        $router->addRoute('GET', '/products/{id}', 'ProductController', 'show');
        $router->addRoute('POST', '/products', 'ProductController', 'store');
        $router->addRoute('POST', '/products/{id}', 'ProductController', 'update');
        $router->addRoute('DELETE', '/products/{id}', 'ProductController', 'destroy');
    }
}