<?php

namespace Api;
class Container
{
    private array $dependencies = [];

    public function set(string $name, $dependency)
    {
        $this->dependencies[$name] = $dependency;
    }

    public function get($name)
    {
        if (isset($this->dependencies[$name])) {
            $dependency = $this->dependencies[$name];
            if ($dependency instanceof \Closure) {
                $dependency = $dependency();
                $this->dependencies[$name] = $dependency;
            }
            return $dependency;
        }
        if (class_exists($name)) {
            $this->dependencies[$name] = new $name();
            return $this->dependencies[$name];
        }

        throw new \Exception("Dependency '{$name}' not found.");
    }
}