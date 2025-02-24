import {onProductCreated, onProductUpdated} from '../events/product';
import ProductService from "../services/ProductService";
import Product from "../models/Product";
import FormComponent, {FormFields} from "./IComponent";
import {IKeyValue} from "../utils/IKeyValue";


class ProductForm extends FormComponent<Product> {
    private productService: ProductService;

    constructor() {
        super();
        this.productService = new ProductService();
    }

    getFormData(): Product {
        const data: IKeyValue = this.getFormValues();
        return new Product(data);
    }

    async create(product: Product): Promise<any> {
        try {
            const newProduct = await this.productService.create(product);
            this.reset();
            onProductCreated.trigger('success', newProduct);
        } catch (error) {
            onProductCreated.trigger('error', error);
        }
    }

    async update(id: string, product: Product): Promise<any> {
        try {
            const updatedProduct = await this.productService.update(id, product);
            this.reset();
            onProductUpdated.trigger('success', updatedProduct);
        } catch (error) {
            onProductUpdated.trigger('error', error);
        }
    }

    getFormFields(): FormFields[] {
        return [
            {type: 'hidden', id: 'id', name: 'id'},
            {type: 'text', label: 'SKU', id: 'sku', name: 'sku', required: true},
            {type: 'text', label: 'Título', id: 'title', name: 'title', required: true},
            {type: 'textarea', label: 'Descrição', id: 'description', name: 'description', required: true},
            {type: 'decimal', label: 'Preço', id: 'price', name: 'price', required: true},
            {type: 'decimal', label: 'Preço promocional', id: 'sale_price', name: 'sale_price'},
            {
                type: 'text',
                label: 'Data de vigência do preço promocional',
                id: 'sale_price_effective_date',
                name: 'sale_price_effective_date'
            },
            {type: 'decimal', label: 'Peso', id: 'shipping_weight', name: 'shipping_weight', required: true},
            {type: 'text', label: 'Tipo do Produto', id: 'product_type', name: 'product_type', required: true},
            {type: 'url', label: 'Link', id: 'link', name: 'link', required: true},
            {type: 'url', label: 'Link da Imagem', id: 'image_link', name: 'image_link', required: true},
            {
                type: 'select', label: 'Disponibilidade', id: 'availability', name: 'availability',
                options: [{
                    label: 'in stock',
                    value: 'in stock'
                }, {
                    label: 'out of stock',
                    value: 'out of stock'
                }, {
                    label: 'preorder',
                    value: 'preorder'
                }]
            },
            {type: 'text', label: 'Marca', id: 'brand', name: 'brand'},
            {type: 'text', label: 'GTIN', id: 'gtin', name: 'gtin'},
            {type: 'text', label: 'MPN', id: 'mpn', name: 'mpn'},
            {
                type: 'select', label: 'Condição', id: 'condition', name: 'condition',
                options: [{
                    label: 'new', value: 'new'
                }, {
                    label: 'used', value: 'used'
                }, {
                    label: 'refurbished', value: 'refurbished'
                }]
            },
            {
                type: 'select', label: 'Existe Identificador?', id: 'identifier_exists', name: 'identifier_exists',
                options: [{
                    label: 'yes', value: 'yes'
                }, {
                    label: 'no', value: 'no'
                }]
            },
        ];
    }
}

export default ProductForm;