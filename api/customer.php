<?php
$method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper($_SERVER['REQUEST_METHOD']) : 'GET';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$bdCustomers = 'customers.json';
$customers = json_decode(file_get_contents($bdCustomers));
$save = false;
$notfound = false;
$error = false;
$response = $customers;

function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // allow all origins
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}

function treatData($data)
{
    $filteredData = [];
    foreach ($data as $key => $value) {
        $filteredValue = filter_var($value, FILTER_SANITIZE_STRING);
        $sanitizedValue = htmlspecialchars($filteredValue, ENT_QUOTES, 'UTF-8');
        if ($key === 'email') {
            $sanitizedValue = mb_strtolower($sanitizedValue, 'UTF-8');
        }
        $filteredData[$key] = $sanitizedValue;
    }
    return $filteredData;
}

function validate()
{
    if (empty($_POST['name'])) {
        return false;
    }
    if (empty($_POST['email'])) {
        return false;
    }
    return true;
}

if ($method) {
    if ($method === 'GET' && $id) {
        $notfound = true;
        foreach ($customers as $customer) {
            if ($customer->id == $id) {
                $response = $customer;
                $notfound = false;
                break;
            }
        }
    }
    if ($method === 'POST') {
        $_POST = treatData($_POST);
        if (validate()) {
            if ($id) {
                foreach ($customers as $key => $customer) {
                    if ($customer->id == $id) {
                        $_POST['id'] = $id;
                        $customers[$key] = $_POST;
                        $response = $_POST;
                        $save = true;
                        break;
                    }
                }
                if (!$save) {
                    $notfound = true;;
                }
            } else {
                $_POST['id'] = uniqid();
                $customers[] = $_POST;
                $response = $_POST;
                $save = true;
            }
        } else {
            $error = true;
        }
    }
    if ($method === 'DELETE' && $id) {
        $notfound = true;
        foreach ($customers as $key => $customer) {
            if ($customer->id == $id) {
                $response = $customer;
                unset($customers[$key]);
                $notfound = false;
                $save = true;
                break;
            }
        }
    }
}

cors();
if ($notfound) {
    header("HTTP/1.0 404 Not Found");
    $response = ['error' => true, 'error_message' => 'Customer not found'];
} elseif ($error) {
    header("HTTP/1.0 400 There was a validation error");
    $response = ['error' => true, 'error_message' => 'Customer invalid data'];
} else {
    header('Content-Type: application/json');
}
if ($save) {
    file_put_contents($bdCustomers, json_encode(array_values($customers)));
}
print json_encode($response, JSON_PRETTY_PRINT);