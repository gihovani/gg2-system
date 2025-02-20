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
        this.btnNew.addClass('visually-hidden');
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
        this.form = $(`<form id="customer-create">
            <h1 class="title">Cadastro de Clientes</h1>
            <input type="hidden" id="id" name="id">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="name">Nome:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" id="name" name="name" autocomplete="off" required>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="email">E-mail:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="email" id="email" name="email" autocomplete="off" required>
                </div>
            </div>
            <div class="row">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-secondary visually-hidden btn-new" type="reset">Novo</button>
                    <button class="btn btn-primary" type="submit">Salvar</button>
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
                this.btnNew.removeClass('visually-hidden');
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