<?php
declare(strict_types=1);

namespace Api\Base\Repositories;

use Api\Base\Models\Model;

abstract class JsonRepository implements RepositoryInterface
{
    private string $file;
    private string $modelClassName;

    public function __construct(string $file, string $modelClassName)
    {
        $this->file = $file;
        $this->modelClassName = $modelClassName;
    }

    private function readFile(): ?array
    {
        return json_decode(file_get_contents($this->file), true);
    }

    private function saveFile(array $objects)
    {
        file_put_contents($this->file, json_encode($objects, JSON_PRETTY_PRINT));
    }

    private function createModel(array $data): Model
    {
        return call_user_func(array($this->modelClassName, 'create'), $data);
    }

    public function all(): array
    {
        $tmp = [];
        $data = $this->readFile();
        foreach ($data as $arguments) {
            $tmp[] = $this->createModel($arguments);
        }
        return $tmp;
    }

    public function find(string $id): ?Model
    {
        $data = $this->all();
        foreach ($data as $object) {
            if ($object->getId() === $id) {
                return $object;
            }
        }
        return null;
    }

    public function create(array $data): Model
    {
        $objects = $this->all();
        $data['id'] = uniqid();
        $object = $this->createModel($data);
        $objects[] = $object;
        $this->saveFile($objects);
        return $object;
    }

    public function update(string $id, array $data): ?Model
    {
        $objects = $this->all();
        foreach ($objects as $key => $object) {
            if ($object->getId() === $id) {
                $data['id'] = $id;
                $object = $this->createModel($data);
                $objects[$key] = $object;
                $this->saveFile($objects);
                return $object;
            }
        }
        return null;
    }

    public function delete(string $id): ?Model
    {
        $objects = $this->all();
        foreach ($objects as $key => $object) {
            if ($object->getId() === $id) {
                unset($objects[$key]);
                $this->saveFile(array_values($objects));
                return $object;
            }
        }
        return null;
    }
}