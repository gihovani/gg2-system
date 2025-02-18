<?php
declare(strict_types=1);

namespace Api\Customer\Controllers;

use Api\Base\Controllers\Controller;
use Api\Customer\Repositories\CustomerRepositoryInterface;
use Api\Customer\Validators\CustomerValidator;
use api\Utils\Request;

class CustomerController extends Controller
{
    public function __construct(
        CustomerRepositoryInterface $customerRepository,
        CustomerValidator           $customerValidator,
        Request                     $request
    )
    {
        parent::__construct($customerRepository, $customerValidator, $request);
    }
}