<?php
declare(strict_types=1);

namespace Api\Customer\Models;

use Api\Base\Models\Model;

class Customer extends Model
{
    public static function create(array $data): Customer
    {
        return new self($data);
    }
}