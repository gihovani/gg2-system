class Customer {
    constructor(data) {
        this.id = (data.id) ? data.id : 0;
        this.name = data.name;
        this.email = data.email;
    }
}

export default Customer;