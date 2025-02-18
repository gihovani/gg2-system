<?php
declare(strict_types=1);

namespace Api\Base\Controllers;

interface ControllerInterface
{

    public function index();

    public function show(string $id);

    public function store();

    public function update(string $id);

    public function destroy(string $id);
}