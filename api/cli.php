<?php
declare(strict_types=1);
require_once 'env.php';

if ($argc !== 2) {
    die("
This is a command line PHP script with one option
Usage:
php $argv[0] <command>

<command> can be some word you would like to print out.  
With the create-products, refresh-data-base
");
}
$command = $argv[1];
if ($command === 'create-products') {
    $repository = new \Api\Product\Repositories\JsonProductRepository(DATABASE_PRODUCTS);
    try {
        $import = new \Api\Product\Command\ProductImportFromSitemap(BP . '../xml/surya.xml', $repository);
        $import->execute();
    } catch (Exception $e) {
        print $e->getMessage() . PHP_EOL;
    }

    exit;
}
if ($command === 'refresh-data-base') {
    file_put_contents(DATABASE_PRODUCTS, '[]');
    file_put_contents(DATABASE_CUSTOMERS, '[]');
    echo sprintf("Arquivos criados com sucesso: %s, %s", pathinfo(DATABASE_CUSTOMERS, PATHINFO_FILENAME), pathinfo(DATABASE_PRODUCTS, PATHINFO_FILENAME));
}