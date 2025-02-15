import CustomerService from '../services/CustomerService.js';
import {
    onCustomerCreated,
    onCustomerUpdated,
    onCustomerSelected,
    onCustomerDeleted,
    onCustomerListLoaded
} from '../utils/eventManager.js';

class CustomerList {
    constructor(listId) {
        this.list = $(listId);
        this.customers = [];
        this.loadData();
        onCustomerCreated.on('success', (customer) => {
            console.log('customerCreatedEvent on success', customer);
            this.addCustomerToList(customer);
        });
        onCustomerUpdated.on('success', (customer) => {
            console.log('customerUpdatedEvent on success', customer);
            this.updateCustomerToList(customer);
        });
        onCustomerDeleted.on('success', (customer) => {
            console.log('customerDeletedEvent on success', customer);
            this.deleteCustomerToList(customer);
        });
    }

    async loadData() {
        try {
            this.customers = await CustomerService.read();
            this.updateList();
            onCustomerListLoaded.trigger('success', this.customers);
        } catch (error) {
            console.error('Error:', error);
            alert(`Não foi possível carregar a lista de clientes\nOlhe no console para mais detalhes.`);
            onCustomerListLoaded.trigger('error', this.customers);
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
                alert(`Cliente (${customer.name}) removido com sucesso!`);
            } catch (error) {
                onCustomerDeleted.trigger('error', error);
                alert(`Não foi possível remover o cliente id: ${customer.id}\nOlhe no console para mais detalhes.`);
            }
        });
        tdButton.append([btnEdit, btnRemove]);
        tr.append([tdId, tdName, tdEmail, tdButton]);
        return tr;
    }

    updateList() {
        this.list.empty();
        this.customers.forEach(customer => {
            this.list.append(this.htmlItem(customer));
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