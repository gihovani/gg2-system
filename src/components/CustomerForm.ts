import $ from 'jquery';
import {onCustomerCreated, onCustomerUpdated} from '../events/customer';
import {DataComponent, IComponent} from './IComponent';
import CustomerService from "../services/CustomerService";

class CustomerForm extends DataComponent implements IComponent {
    private form: JQuery<HTMLFormElement>;
    private id: JQuery<HTMLInputElement>;
    private name: JQuery<HTMLInputElement>;
    private email: JQuery<HTMLInputElement>;
    private btnNew: JQuery<HTMLInputElement>;
    private customerService: CustomerService;

    constructor() {
        super();
        this.form = $('<form></form>');
        this.id = $('<input />');
        this.name = $('<input />');
        this.email = $('<input />');
        this.btnNew = $('<button></button>');
        this.customerService = new CustomerService();
    }

    reset() {
        this.btnNew.addClass('is-hidden');
        this.form.trigger('reset');
        this.id.val('');
        this.name.val('');
        this.email.val('');
    }

    async create() {
        const name = <string>this.name.val();
        const email = <string>this.email.val();
        try {
            const customer = await this.customerService.create({id: '', name, email});
            this.reset();
            onCustomerCreated.trigger('success', customer);
        } catch (error) {
            onCustomerCreated.trigger('error', error);
        }
    }

    async update() {
        const id = <string>this.id.val();
        const name = <string>this.name.val();
        const email = <string>this.email.val();
        try {
            const customer = await this.customerService.update(id, {id, name, email});
            this.reset();
            onCustomerUpdated.trigger('success', customer);
        } catch (error) {
            onCustomerUpdated.trigger('error', error);
        }
    }

    async handleSubmit(event: Event) {
        event.preventDefault();
        const id = <string>this.id.val();
        if (id) {
            return await this.update();
        }
        return await this.create();
    }

    render(): Promise<JQuery<HTMLElement>> {
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
        return new Promise<JQuery<HTMLElement>>(resolve => {
            this.btnNew = this.form.find('button.btn-new');
            this.id = this.form.find('#id');
            this.name = this.form.find('#name');
            this.email = this.form.find('#email');
            if (this.data.id) {
                this.id.val(this.data.id ?? '');
                this.name.val(this.data.name ?? '');
                this.email.val(this.data.email ?? '');
                this.btnNew.removeClass('is-hidden');
            }
            this.bindEvents();
            resolve(this.form);
        });
    }

    bindEvents() {
        this.btnNew.on('click', this.reset.bind(this));
        this.form.on('submit', this.handleSubmit.bind(this));
    }
}

export default CustomerForm;