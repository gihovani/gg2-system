<?php
declare(strict_types=1);

namespace Api\Base\Validators;

interface ValidatorInterface
{
    public function validate(array $data): bool;

    public function getErros(): array;
}