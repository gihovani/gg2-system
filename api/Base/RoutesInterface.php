<?php
declare(strict_types=1);

namespace Api\Base;

use Api\Utils\Container;
use Api\Utils\Router;

interface RoutesInterface
{
    public static function addRoutes(Container $container, Router $router);
}