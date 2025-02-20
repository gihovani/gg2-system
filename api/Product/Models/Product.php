<?php
declare(strict_types=1);

namespace Api\Product\Models;

use Api\Base\Models\Model;

class Product extends Model
{
    public static function create(array $data): Product
    {
        return new self($data);
    }
}