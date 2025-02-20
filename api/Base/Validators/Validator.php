<?php
declare(strict_types=1);

namespace Api\Base\Validators;
abstract class Validator implements ValidatorInterface
{
    private array $data;
    private array $rules;
    private array $errors = [];

    public function __construct(array $rules)
    {
        $this->rules = $rules;
    }

    public function validate(array $data): bool
    {
        $this->data = $data;
        foreach ($this->rules as $field => $rule) {
            $rulesArray = explode('|', $rule);
            foreach ($rulesArray as $r) {
                $this->applyRule($field, $r);
            }
        }
        return empty($this->errors);
    }

    private function applyRule($field, $rule)
    {
        $value = $this->data[$field] ?? '';
        if ($rule === 'required') {
            if (empty($value)) {
                $this->addError($field, 'required');
            }
            return;
        }
        if ($rule === 'email') {
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $this->addError($field, 'email');
            }
            return;
        }
        if ($rule === 'numeric') {
            if (!is_numeric($value)) {
                $this->addError($field, 'numeric');
            }
            return;
        }
        if (strpos($rule, 'min:') === 0) {
            $min = (int)substr($rule, 4);
            if (strlen($value) < $min) {
                $this->addError($field, 'min:' . $min);
            }
            return;
        }
        if (strpos($rule, 'max:') === 0) {
            $max = (int)substr($rule, 4);
            if (strlen($value) > $max) {
                $this->addError($field, 'max:' . $max);
            }
        }
    }

    private function addError($field, $rule)
    {
        $this->errors[$field] = $this->errors[$field] ?? [];
        $this->errors[$field][] = $rule;
    }

    public function errors(): array
    {
        return $this->errors;
    }

    public function message(string $separator = ', '): string
    {
        if (empty($this->errors)) {
            return '';
        }
        $message = count($this->errors) > 1 ? 'The fields %s are invalid!' : 'The field %s is invalid!';
        return sprintf($message, implode($separator, array_keys($this->errors)));
    }
}