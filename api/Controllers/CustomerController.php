<?php

namespace Api\Controllers;

use Api\Repositories\CustomerRepositoryInterface;
use Api\Request;
use Api\Validators\CustomerValidator;

class CustomerController
{
    private CustomerRepositoryInterface $customerRepository;
    private CustomerValidator $customerValidator;
    private Request $request;

    public function __construct(
        CustomerRepositoryInterface $customerRepository,
        CustomerValidator           $customerValidator,
        Request                     $request
    )
    {
        $this->customerRepository = $customerRepository;
        $this->customerValidator = $customerValidator;
        $this->request = $request;
    }

    public function index()
    {
        $customers = $this->customerRepository->all();
        echo json_encode($customers);
    }

    public function show(string $id)
    {
        $customer = $this->customerRepository->find($id);
        if (!$customer) {
            http_response_code(404);
            echo json_encode(['error' => true, 'message' => 'Customer not found']);
            return;
        }
        echo json_encode($customer);
    }

    public function store()
    {
        $data = $this->request->post();
        if (!$this->customerValidator->validate($data)) {
            http_response_code(400);
            echo json_encode(['error' => true, 'message' => 'Invalid customer data']);
            return;
        }

        $customer = $this->customerRepository->create($data);
        echo json_encode($customer);
    }

    public function update(string $id)
    {
        $data = $this->request->post();
        if (!$this->customerValidator->validate($data)) {
            http_response_code(400);
            echo json_encode(['error' => true, 'message' => 'Invalid customer data']);
            return;
        }

        $customer = $this->customerRepository->update($id, $data);
        echo json_encode($customer);
    }

    public function destroy(string $id)
    {
        $customer = $this->customerRepository->delete($id);
        echo json_encode($customer);
    }
}