<?php
declare(strict_types=1);

namespace Api\Base\Models;

use Api\Utils\DataObject;

class Model extends DataObject implements ModelInterface
{
    /**
     * @param array $data
     * @return $this
     */
    public static function create(array $data): Model
    {
        return new self($data);
    }
}