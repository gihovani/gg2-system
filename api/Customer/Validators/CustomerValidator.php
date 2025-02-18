<?php
declare(strict_types=1);

namespace Api\Customer\Validators;

use Api\Base\Validators\Validator;

class CustomerValidator extends Validator
{
    public function validate(array $data): bool
    {
        $this->errors = [];
        if (empty($data['name'])) {
            $this->errors['name'] = 'Name is required';
        }
        if (empty($data['email'])) {
            $this->errors['email'] = 'E-mail is required';
        }
        return parent::validate($data);
    }
}