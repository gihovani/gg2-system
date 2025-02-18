<?php
declare(strict_types=1);

namespace Api\Customer\Repositories;

use Api\Base\Repositories\JsonRepository;

class JsonCustomerRepository extends JsonRepository implements CustomerRepositoryInterface
{
    public function __construct(string $file)
    {
        parent::__construct($file, '\Api\Customer\Models\Customer');
    }
}