import Customer from "../models/Customer";
import Api from "../utils/Api";

class CustomerService {
    private readonly url: string;
    private readonly api: Api;

    constructor() {
        this.url = 'http://localhost:8888/customers';
        this.api = new Api();
    }

    async read(id = null): Promise<Customer | Customer[]> {
        const url = (id) ? `${this.url}/${id}` : this.url;

        const response = await this.api.get(url);
        if (id) {
            return new Customer(response);
        }
        return response.map((customer: Customer) => {
            return new Customer(customer);
        });
    }

    async create(customer: Customer): Promise<Customer> {
        const createdCustomer = await this.api.post(this.url, customer);
        return new Customer(createdCustomer);
    }

    async update(id: string, customer: Customer): Promise<Customer> {
        const updatedCustomer = await this.api.put(`${this.url}/${id}`, customer);
        return new Customer(updatedCustomer);
    }

    async delete(id: string): Promise<Customer> {
        const createdCustomer = await this.api.delete(`${this.url}/${id}`);
        return new Customer(createdCustomer);
    }
}

export default CustomerService;