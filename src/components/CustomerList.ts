import $ from 'jquery';
import CustomerService from '../services/CustomerService';
import {
    onCustomerSelected,
    onCustomerDeleted,
    onCustomerListLoaded
} from '../events/customer';
import Customer from "../models/Customer";
import {IComponent} from "./IComponent";

class CustomerList implements IComponent {
    private list: JQuery<HTMLElement>;
    private customers: Customer[] = [];
    private customerService: CustomerService;

    constructor() {
        this.list = $('');
        this.customerService = new CustomerService();
    }

    render(): Promise<JQuery<HTMLElement>> {
        this.list = $(`<h2>Lista de Clientes</h2>
        <table class="table table-bordered" id="customer-list">
            <thead>
            <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Nome</abbr></th>
                <th><abbr title="E-mail">E-mail</abbr></th>
                <th><abbr title="Actions">#</abbr></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="4">Nenhum dado encontrado.</td>
            </tr>
            </tbody>
        </table>`);
        return new Promise<JQuery<HTMLElement>>(async (resolve) => {
            this.customers = [];
            await this.loadData();
            this.bindEvents();
            resolve(this.list);
        });
    }

    bindEvents() {
        onCustomerDeleted.on('success', (customer: Customer) => {
            this.deleteCustomerToList(customer);
        });
    }

    async loadData() {
        try {
            this.customers = <Customer[]>(await this.customerService.read());
            this.updateList();
            onCustomerListLoaded.trigger('success', this.customers);
        } catch (error) {
            onCustomerListLoaded.trigger('error', error);
        }
    }

    htmlItem(customer: Customer) {
        const id = customer.id ?? '';
        const tr = $('<tr></tr>');
        const tdId = $('<td></td>').text(id);
        const tdName = $('<td></td>').text(customer.name);
        const tdEmail = $('<td></td>').text(customer.email);
        const btnEdit = $('<button></button>').addClass(['btn','btn-secondary']).text('Alterar');
        const tdButton = $('<td></td>');
        btnEdit.on('click', () => {
            onCustomerSelected.trigger('success', customer);
        });
        const btnRemove = $('<button></button>').addClass(['btn','btn-danger']).text('Apagar');
        btnRemove.on('click', async () => {
            try {
                const customer = await this.customerService.delete(id);
                onCustomerDeleted.trigger('success', customer);
            } catch (error) {
                onCustomerDeleted.trigger('error', error);
            }
        });
        tdButton.append([btnEdit, btnRemove]);
        tr.append([tdId, tdName, tdEmail, tdButton]);
        return tr;
    }

    updateList() {
        const list = this.list.find('tbody');
        list.empty();
        this.customers.forEach(customer => {
            list.append(this.htmlItem(customer));
        });
    }

    deleteCustomerToList(data: Customer) {
        this.customers = this.customers.filter(customer => (customer.id !== data.id));
        this.updateList();
    }
}

export default CustomerList;