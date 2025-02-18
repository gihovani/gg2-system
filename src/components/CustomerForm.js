import CustomerService from '../services/CustomerService.js';
import {onCustomerCreated, onCustomerUpdated, onCustomerSelected} from '../events/customer.js';

class CustomerForm {
    constructor() {
        this.form = $('<form></form>');
        this.id = $('<input />');
        this.name = $('<input />');
        this.email = $('<input />');
        this.btnNew = $('<button></button>');
    }

    reset() {
        this.btnNew.addClass('is-hidden');
        this.form.trigger('reset');
        this.id.val('');
        this.name.val('');
        this.email.val('');
    }

    async create() {
        const name = this.name.val();
        const email = this.email.val();
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

    render() {
        this.form = $(`<form id="customerForm">
            <h1 class="title">Cadastro de Clientes</h1>
            <input type="hidden" id="id" name="id">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="name">Nome:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <input class="input" type="text" id="name" name="name" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="email">E-mail:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <input class="input" type="email" id="email" name="email" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control is-fullwidth">
                    <button class="button is-parent is-hidden btn-new" type="button">Novo</button>
                    <button class="button is-primary" type="submit">Salvar</button>
                </div>
            </div>
        </form>`);
        this.btnNew = this.form.find('button.btn-new');
        this.id = this.form.find('#id');
        this.name = this.form.find('#name');
        this.email = this.form.find('#email');
        this.bindEvents();
        return this.form;
    }

    bindEvents() {
        this.btnNew.on('click', this.reset.bind(this));
        this.form.on('submit', this.handleSubmit.bind(this));
        onCustomerSelected.on('success', (customer) => {
            this.id.val(customer.id);
            this.name.val(customer.name);
            this.email.val(customer.email);
            this.btnNew.removeClass('is-hidden');
        });
    }
}

export default CustomerForm;