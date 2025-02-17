<?php

namespace Api\Validators;
class CustomerValidator
{
    public function validate(array $data): bool
    {
        if (empty($data['name'])) {
            return false;
        }
        if (empty($data['email'])) {
            return false;
        }
        return true;
    }
}