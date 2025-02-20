import {IKeyValue} from "../utils/IKeyValue";

class Customer {
    public id: string;
    public name: string;
    public email: string;

    constructor(data: IKeyValue) {
        this.id = (data.id) ? <string>data.id : '';
        this.name = <string>data.name;
        this.email = <string>data.email;
    }
}

export default Customer;