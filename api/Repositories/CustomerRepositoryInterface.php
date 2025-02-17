<?php

namespace Api\Repositories;

use Api\Models\Customer;

interface CustomerRepositoryInterface
{
    public function all(): array;

    public function find(string $id): ?Customer;

    public function create(array $data): Customer;

    public function update(string $id, array $data): ?Customer;

    public function delete(string $id): ?Customer;
}