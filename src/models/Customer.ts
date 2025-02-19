class Customer {
    public id: string;
    public name: string;
    public email: string;

    constructor(data: { id?: string, name: string, email: string }) {
        this.id = (data.id) ? data.id : '';
        this.name = data.name;
        this.email = data.email;
    }
}

export default Customer;