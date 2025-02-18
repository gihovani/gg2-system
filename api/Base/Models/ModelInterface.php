<?php
declare(strict_types=1);

namespace Api\Base\Models;
interface ModelInterface extends \JsonSerializable
{
    public static function create(array $data): ModelInterface;
}