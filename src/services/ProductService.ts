import Product from "../models/Product";
import {ApiService} from "./IService";
import {IKeyValue} from "../utils/IKeyValue";

class ProductService extends ApiService {

    constructor() {
        super('http://localhost:8888/products');
    }

    async read(id = null): Promise<Product | Product[]> {
        const url = (id) ? `${this.url}/${id}` : this.url;

        const response = await this.api.get(url);
        if (id) {
            return new Product(response);
        }
        return response.map((product: IKeyValue) => {
            return new Product(product);
        });
    }

    async create(product: Product): Promise<Product> {
        const createdProduct: IKeyValue = await this.api.post(this.url, product);
        return new Product(createdProduct);
    }

    async update(id: string, product: Product): Promise<Product> {
        const updatedProduct: IKeyValue = await this.api.put(`${this.url}/${id}`, product);
        return new Product(updatedProduct);
    }

    async delete(id: string): Promise<Product> {
        const createdProduct: IKeyValue = await this.api.delete(`${this.url}/${id}`);
        return new Product(createdProduct);
    }
}

export default ProductService;