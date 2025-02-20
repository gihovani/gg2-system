<?php
declare(strict_types=1);

namespace Api\Product\Controllers;

use Api\Base\Controllers\Controller;
use Api\Product\Repositories\ProductRepositoryInterface;
use Api\Product\Validators\ProductValidator;
use api\Utils\Request;

class ProductController extends Controller
{
    public function __construct(
        ProductRepositoryInterface $productRepository,
        ProductValidator           $productValidator,
        Request                    $request
    )
    {
        parent::__construct($productRepository, $productValidator, $request);
    }
}