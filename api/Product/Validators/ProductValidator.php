<?php
declare(strict_types=1);

namespace Api\Product\Validators;

use Api\Base\Validators\Validator;

class ProductValidator extends Validator
{
    public function __construct()
    {
        parent::__construct([
            'title' => 'required|min:3|max:100',
            'price' => 'required|numeric',
            'description' => 'required|min:3|max:100',
            'image_link' => 'required|min:3|max:100',
        ]);
    }
}