<?php
declare(strict_types=1);

namespace Api\Utils;

class Router
{
    private array $routes = [];
    private Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function addRoute($method, $path, $controller, $action)
    {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action
        ];
    }

    public function dispatch(Container $container)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
        if ($this->request->method === 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
            }
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            exit(0);
        }
        foreach ($this->routes as $route) {
            $this->request->path = $route['path'];
            $this->request->action = $route['action'];
            $params = explode('/', trim($this->request->uri, '/'));
            $pathParts = explode('/', trim($this->request->path, '/'));
            if (count($params) === count($pathParts) && ($route['method'] === $this->request->method) && $pathParts[0] === $params[0]) {
                foreach ($pathParts as $key => $part) {
                    if (strpos($part, '{') !== false) {
                        $part = str_replace(['{', '}'], '', $part);
                        $this->request->params[$part] = $params[$key];
                    }
                }
                $this->request->controller = $route['controller'];
                $controller = $container->get($this->request->controller);
                header('Content-Type: application/json');
                return call_user_func_array([$controller, $this->request->action], $this->request->params);
            }
        }

        // Rota não encontrada
        http_response_code(404);
        die(json_encode(['error' => true, 'message' => 'Not Found']));
    }
}