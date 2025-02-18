<?php
declare(strict_types=1);

namespace Api\Utils;

class Request
{
    public string $method;
    public string $path;
    public string $uri;
    public string $action;
    public string $controller;
    public array $params;
    public array $data;

    public function __construct()
    {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->params = [];
        $this->data = [];
        $this->data();
    }

    private function data()
    {
        $input = file_get_contents('php://input');
        if (empty($input)) {
            $this->data = $_POST;
            return;
        }
        if (strpos($_SERVER['CONTENT_TYPE'], 'application/x-www-form-urlencoded') === 0) {
            parse_str($input, $this->data);
        } else {
            $this->data = json_decode($input, true);
        }
    }

    public function post(string $key = '', $default = null)
    {
        if (empty($key)) {
            return $this->data;
        }
        return $this->data[$key] ?? $default;
    }

    public function has($key): bool
    {
        return isset($this->data[$key]);
    }
}