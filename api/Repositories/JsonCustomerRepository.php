<?php

namespace Api\Repositories;

use Api\Models\Customer;

class JsonCustomerRepository implements CustomerRepositoryInterface
{
    private string $file;

    public function __construct(string $file)
    {
        $this->file = $file;
    }

    private function readFile(): ?array
    {
        return json_decode(file_get_contents($this->file), true);
    }

    private function saveFile(array $customers)
    {
        file_put_contents($this->file, json_encode($customers, JSON_PRETTY_PRINT));
    }

    public function all(): array
    {
        $tmp = [];
        $data = $this->readFile();
        foreach ($data as $customer) {
            $tmp[] = Customer::create($customer);
        }
        return $tmp;
    }

    public function find(string $id): ?Customer
    {
        $data = $this->all();
        foreach ($data as $customer) {
            if ($customer->id === $id) {
                return $customer;
            }
        }
        return null;
    }

    public function create(array $data): Customer
    {
        $customers = $this->all();
        $data['id'] = uniqid();
        $customer = Customer::create($data);
        $customers[] = $customer;
        $this->saveFile($customers);
        return $customer;
    }

    public function update(string $id, array $data): ?Customer
    {
        $customers = $this->all();
        foreach ($customers as $key => $customer) {
            if ($customer->id === $id) {
                $data['id'] = $id;
                $customer = Customer::create($data);
                $customers[$key] = $customer;
                $this->saveFile($customers);
                return $customer;
            }
        }
        return null;
    }

    public function delete(string $id): ?Customer
    {
        $customers = $this->all();
        foreach ($customers as $key => $customer) {
            if ($customer->id === $id) {
                unset($customers[$key]);
                $this->saveFile(array_values($customers));
                return $customer;
            }
        }
        return null;
    }
}