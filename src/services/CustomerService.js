import api from '../utils/api.js';
import Customer from '../models/Customer.js';

class CustomerService {
    constructor() {
        this.url = 'http://localhost:8888/customers';
    }

    async read(id = null) {
        const url = (id) ? `${this.url}/${id}` : this.url;
        try {
            const response = await api.get(url);
            if (id) {
                return new Customer(response);
            }
            return response.map(customer => {
                return new Customer(customer);
            });
        } catch (error) {
            throw error;
        }
    }

    async create(customer) {
        try {
            const createdCustomer = await api.post(this.url, customer);
            return new Customer(createdCustomer);
        } catch (error) {
            throw error;
        }
    }

    async update(id, customer) {
        try {
            const updatedCustomer = await api.put(`${this.url}/${id}`, customer);
            return new Customer(updatedCustomer);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const createdCustomer = await api.delete(`${this.url}/${id}`);
            return new Customer(createdCustomer);
        } catch (error) {
            throw error;
        }
    }
}

export default new CustomerService();