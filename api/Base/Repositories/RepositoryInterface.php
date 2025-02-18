<?php
declare(strict_types=1);

namespace Api\Base\Repositories;

use Api\Base\Models\Model;

interface RepositoryInterface
{
    public function all(): array;

    public function find(string $id): ?Model;

    public function create(array $data): Model;

    public function update(string $id, array $data): ?Model;

    public function delete(string $id): ?Model;
}