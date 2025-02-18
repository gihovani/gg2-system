<?php
declare(strict_types=1);

namespace Api\Customer\Validators;

use Api\Base\Validators\Validator;

class CustomerValidator extends Validator
{
    public function __construct()
    {
        parent::__construct(['name' => 'required|min:3|max:100', 'email' => 'required|email']);
    }
}