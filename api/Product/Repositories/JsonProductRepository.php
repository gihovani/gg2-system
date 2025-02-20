<?php
declare(strict_types=1);

namespace Api\Product\Repositories;

use Api\Base\Repositories\JsonRepository;

class JsonProductRepository extends JsonRepository implements ProductRepositoryInterface
{
    public function __construct(string $file)
    {
        parent::__construct($file, '\Api\Product\Models\Product');
    }
}