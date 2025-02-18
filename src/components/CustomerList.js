import CustomerService from '../services/CustomerService.js';
import {
    onCustomerCreated,
    onCustomerUpdated,
    onCustomerSelected,
    onCustomerDeleted,
    onCustomerListLoaded
} from '../events/customer.js';

class CustomerList {
    constructor() {
        this.list = '';
    }

    async render() {
        this.list = $(`<h2 class="subtitle">Lista de Clientes</h2>
        <table class="table is-bordered is-fullwidth">
            <thead>
            <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Nome</abbr></th>
                <th><abbr title="E-mail">E-mail</abbr></th>
                <th><abbr title="Actions">#</abbr></th>
            </tr>
            </thead>
            <tbody id="customerList">
            <tr>
                <td colspan="4">Nenhum dado encontrado.</td>
            </tr>
            </tbody>
        </table>`);
        this.customers = [];
        await this.loadData();
        this.bindEvents();
        return this.list;
    }

    bindEvents() {
        onCustomerCreated.on('success', (customer) => {
            this.addCustomerToList(customer);
        });
        onCustomerUpdated.on('success', (customer) => {
            this.updateCustomerToList(customer);
        });
        onCustomerDeleted.on('success', (customer) => {
            this.deleteCustomerToList(customer);
        });
    }

    async loadData() {
        try {
            this.customers = await CustomerService.read();
            this.updateList();
            onCustomerListLoaded.trigger('success', this.customers);
        } catch (error) {
            onCustomerListLoaded.trigger('error', error);
        }
    }

    htmlItem(customer) {
        const id = customer.id;
        const tr = $('<tr></tr>');
        const tdId = $('<td></td>').text(customer.id);
        const tdName = $('<td></td>').text(customer.name);
        const tdEmail = $('<td></td>').text(customer.email);
        const btnEdit = $('<button></button>').text('Alterar');
        const tdButton = $('<td></td>').addClass(['buttons', 'has-addons', 'is-centered']);
        btnEdit.on('click', () => {
            onCustomerSelected.trigger('success', customer);
        });
        const btnRemove = $('<button></button>').text('Apagar');
        btnRemove.on('click', async () => {
            try {
                const customer = await CustomerService.delete(id);
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
        const list = this.list.find('tbody#customerList');
        list.empty();
        this.customers.forEach(customer => {
            list.append(this.htmlItem(customer));
        });
    }

    addCustomerToList(data) {
        this.customers.push(data);
        this.updateList();
    }

    updateCustomerToList(data) {
        this.customers = this.customers.map(customer => {
            if (customer.id === data.id) {
                return data;
            }
            return customer;
        });
        this.updateList();
    }

    deleteCustomerToList(data) {
        this.customers = this.customers.filter(customer => (customer.id !== data.id));
        this.updateList();
    }
}

export default CustomerList;