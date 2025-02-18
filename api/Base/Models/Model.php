<?php
declare(strict_types=1);

namespace Api\Base\Models;
class Model implements ModelInterface
{
    protected static array $_underscoreCache = [];
    protected array $_data = [];

    public function __construct(array $data)
    {
        $this->addData($data);
    }

    public function addData(array $arr): Model
    {
        foreach ($arr as $index => $value) {
            $this->setData($index, $value);
        }
        return $this;
    }

    /**
     * @param string|array $key
     * @param mixed $value
     * @return $this
     */
    public function setData($key, $value = null): Model
    {
        if ($key === (array)$key) {
            $this->_data = $key;
        } else {
            $this->_data[$key] = $value;
        }
        return $this;
    }

    /**
     * @param string $key
     * @return mixed
     */
    protected function _getData(string $key)
    {
        if (isset($this->_data[$key])) {
            return $this->_data[$key];
        }
        return null;
    }

    /**
     * @param string $key
     * @param string|int $index
     * @return mixed
     */
    public function getData(string $key = '', $index = null)
    {
        if ('' === $key) {
            return $this->_data;
        }
        $data = $this->_getData($key);
        if ($index !== null) {
            if ($data === (array)$data) {
                $data = $data[$index] ?? null;
            } elseif (is_string($data)) {
                $data = explode(PHP_EOL, $data);
                $data = $data[$index] ?? null;
            } elseif ($data instanceof Model) {
                $data = $data->getData($index);
            } else {
                $data = null;
            }
        }
        return $data;
    }

    /**
     * @param array $data
     * @return $this
     */
    public static function create(array $data): Model
    {
        return new self($data);
    }

    /**
     * @param string $name
     * @return string
     */
    protected function _underscore(string $name): string
    {
        if (isset(self::$_underscoreCache[$name])) {
            return self::$_underscoreCache[$name];
        }
        $result = strtolower(trim(preg_replace('/([A-Z]|[0-9]+)/', "_$1", $name), '_'));
        self::$_underscoreCache[$name] = $result;
        return $result;
    }

    /**
     * @param null|string|array $key
     * @return $this
     */
    public function unsetData($key = null): Model
    {
        if ($key === null) {
            $this->setData([]);
        } elseif (is_string($key)) {
            if (isset($this->_data[$key]) || array_key_exists($key, $this->_data)) {
                unset($this->_data[$key]);
            }
        } elseif ($key === (array)$key) {
            foreach ($key as $element) {
                $this->unsetData($element);
            }
        }
        return $this;
    }

    /**
     * @param string $method
     * @param array $args
     * @return mixed
     */
    public function __call(string $method, array $args)
    {
        switch (substr($method, 0, 3)) {
            case 'get':
                $key = $this->_underscore(substr($method, 3));
                $index = $args[0] ?? null;
                return $this->getData($key, $index);
            case 'set':
                $key = $this->_underscore(substr($method, 3));
                $value = $args[0] ?? null;
                return $this->setData($key, $value);
            case 'uns':
                $key = $this->_underscore(substr($method, 3));
                return $this->unsetData($key);
            case 'has':
                $key = $this->_underscore(substr($method, 3));
                return isset($this->_data[$key]);
        }
        throw new \Error(
            sprintf('Invalid method %1::%2', get_class($this), $method)
        );
    }

    /**
     * @param array $keys
     * @return string
     */
    public function toString(array $keys = []): string
    {
        $data = $this->toArray($keys);
        return implode(', ', $data);
    }

    /**
     * @param array $keys array of required keys
     * @return array
     */
    public function toArray(array $keys = []): array
    {
        if (empty($keys)) {
            return $this->_data;
        }

        $result = [];
        foreach ($keys as $key) {
            if (isset($this->_data[$key])) {
                $result[$key] = $this->_data[$key];
            } else {
                $result[$key] = null;
            }
        }
        return $result;
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}