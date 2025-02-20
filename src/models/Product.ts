class Product {
    public id: string;
    public name: string;
    public price: number;

    constructor(data: { id?: string, name: string, price: number }) {
        this.id = (data.id) ? data.id : '';
        this.name = data.name;
        this.price = data.price;
    }
}

export default Product;