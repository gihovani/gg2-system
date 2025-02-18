<?php
declare(strict_types=1);

namespace Api\Base\Controllers;

use Api\Base\Repositories\RepositoryInterface;
use Api\Base\Validators\ValidatorInterface;
use api\Utils\Request;

class Controller implements ControllerInterface
{
    private RepositoryInterface $repository;
    private ValidatorInterface $validator;
    private Request $request;

    public function __construct(
        RepositoryInterface $repository,
        ValidatorInterface  $validator,
        Request             $request
    )
    {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->request = $request;
    }

    protected function showError(int $code = 400)
    {
        $error = [
            'error' => true,
            'message' => ''
        ];
        if ($code === 400) {
            $error['message'] = 'Invalid object data';
            $error['errors'] = $this->validator->getErros();
        } else if ($code === 404) {
            $error['message'] = 'Object not found';
        }
        http_response_code($code);
        echo json_encode($error);
    }

    public function index()
    {
        $objects = $this->repository->all();
        echo json_encode($objects);
    }

    public function show(string $id)
    {
        $object = $this->repository->find($id);
        if (!$object) {
            $this->showError(404);
            return;
        }
        echo json_encode($object);
    }

    public function store()
    {
        $data = $this->request->post();
        if (!$this->validator->validate($data)) {
            $this->showError();
            return;
        }

        $object = $this->repository->create($data);
        echo json_encode($object);
    }

    public function update(string $id)
    {
        $data = $this->request->post();
        if (!$this->validator->validate($data)) {
            $this->showError();
            return;
        }

        $object = $this->repository->update($id, $data);
        echo json_encode($object);
    }

    public function destroy(string $id)
    {
        $object = $this->repository->delete($id);
        echo json_encode($object);
    }
}