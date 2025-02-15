import CustomerForm from './components/CustomerForm.js';
import CustomerList from './components/CustomerList.js';

$(() => {
    new CustomerForm('#customerForm');
    new CustomerList('#customerList');
});