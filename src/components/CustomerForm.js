import CustomerService from '../services/CustomerService.js';
import {onCustomerCreated, onCustomerUpdated, onCustomerSelected} from '../events/customer.js';

class CustomerForm {
    constructor(formId) {
        this.form = $(formId);
        this.btnNew = this.form.find('button.btn-new');
        this.btnNew.on('click', this.reset.bind(this));
        this.form.on('submit', this.handleSubmit.bind(this));
        onCustomerSelected.on('success', (customer) => {
            $('#id').val(customer.id);
            $('#name').val(customer.name);
            $('#email').val(customer.email);
            this.btnNew.removeClass('is-hidden');
        });
    }

    reset() {
        this.btnNew.addClass('is-hidden');
        this.form.trigger('reset');
        $('#id').val('');
        $('#name').val('');
        $('#email').val('');
    }

    async create() {
        const name = $('#name').val();
        const email = $('#email').val();
        try {
            const customer = await CustomerService.create({name, email});
            this.reset();
            onCustomerCreated.trigger('success', customer);
        } catch (error) {
            onCustomerCreated.trigger('error', error);
        }
    }

    async update() {
        const id = $('#id').val();
        const name = $('#name').val();
        const email = $('#email').val();
        try {
            const customer = await CustomerService.update(id, {name, email});
            this.reset();
            onCustomerUpdated.trigger('success', customer);
        } catch (error) {
            onCustomerUpdated.trigger('error', error);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const id = $('#id').val();
        if (id) {
            return await this.update();
        }
        return await this.create();
    }
}

export default CustomerForm;