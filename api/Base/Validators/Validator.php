<?php
declare(strict_types=1);

namespace Api\Base\Validators;
class Validator implements ValidatorInterface
{
    protected array $errors;

    public function __construct()
    {
        $this->errors = [];
    }

    public function validate(array $data): bool
    {
        return empty($this->errors);
    }

    public function getErros(): array
    {
        return $this->errors;
    }
}