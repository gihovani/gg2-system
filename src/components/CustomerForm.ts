import {onCustomerCreated, onCustomerUpdated} from '../events/customer';
import CustomerService from "../services/CustomerService";
import FormComponent, {FormFields} from "./IComponent";
import Customer from "../models/Customer";
import {IKeyValue} from "../utils/IKeyValue";

class CustomerForm extends FormComponent<Customer> {
    private customerService: CustomerService;

    constructor() {
        super();
        this.customerService = new CustomerService();
    }

    getFormData(): Customer {
        const data: IKeyValue = this.getFormValues();
        return new Customer(data);
    }

    async create(customer: Customer): Promise<any> {
        try {
            const newCustomer = await this.customerService.create(customer);
            this.reset();
            onCustomerCreated.trigger('success', newCustomer);
        } catch (error) {
            onCustomerCreated.trigger('error', error);
        }
    }

    async update(id: string, customer: Customer): Promise<any> {
        try {
            const updatedCustomer = await this.customerService.update(id, customer);
            this.reset();
            onCustomerUpdated.trigger('success', updatedCustomer);
        } catch (error) {
            onCustomerUpdated.trigger('error', error);
        }
    }

    getFormFields(): FormFields[] {
        return [
            {type: 'hidden', id: 'id', name: 'id'},
            {type: 'text', label: 'Nome', id: 'name', name: 'name', required: true},
            {type: 'email', label: 'E-mail', id: 'email', name: 'email', required: true},
        ];
    }
}

export default CustomerForm;