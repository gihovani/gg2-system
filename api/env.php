<?php
declare(strict_types=1);

define('BP', dirname(__FILE__) . '/');
const DATABASE_CUSTOMERS = BP . '../db/customers.json';
const DATABASE_PRODUCTS = BP . '../db/products.json';

spl_autoload_register(function ($className) {
    $filePath = __DIR__ . '/' . str_replace('\\', '/', $className) . '.php';
    $filePath = str_replace('/Api/', '/', $filePath);
    if (file_exists($filePath)) {
        require_once $filePath;
    }
});
