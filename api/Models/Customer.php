<?php

namespace Api\Models;
class Customer
{
    public string $id;
    public string $name;
    public string $email;

    public function __construct(array $data)
    {
        foreach ($data as $field => $value) {
            $this->$field = $value;
        }
    }

    public static function create(array $data): Customer
    {
        return new self($data);
    }
}