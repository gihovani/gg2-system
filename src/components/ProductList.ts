import $ from 'jquery';
import {
    onProductSelected,
    onProductDeleted,
    onProductListLoaded
} from '../events/product';
import Product from "../models/Product";
import {IComponent} from "./IComponent";
import ProductService from "../services/ProductService";

class ProductList implements IComponent {
    private list: JQuery<HTMLElement>;
    private products: Product[] = [];
    private productService: ProductService;

    constructor() {
        this.list = $('');
        this.productService = new ProductService();
    }

    render(): Promise<JQuery<HTMLElement>> {
        this.list = $(`<h2>Lista de Produtos</h2>
        <table class="table table-bordered" id="product-list">
            <thead>
            <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Nome</abbr></th>
                <th><abbr title="Brand">Marca</abbr></th>
                <th><abbr title="Price">Preço</abbr></th>
                <th><abbr title="Actions">#</abbr></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="4">Nenhum dado encontrado.</td>
            </tr>
            </tbody>
        </table>`);
        return new Promise<JQuery<HTMLElement>>(async (resolve) => {
            await this.loadData();
            this.bindEvents();
            resolve(this.list);
        });
    }

    bindEvents() {
        onProductDeleted.on('success', (product: Product) => {
            this.deleteProductToList(product);
        });
    }

    async loadData() {
        try {
            this.products = <Product[]>(await this.productService.read()); // Use o ProductService
            this.updateList();
            onProductListLoaded.trigger('success', this.products);
        } catch (error) {
            onProductListLoaded.trigger('error', error);
        }
    }

    htmlItem(product: Product) {
        const id = product.id ?? ''; // Ajuste conforme a estrutura do seu XML
        const tr = $('<tr></tr>');
        const tdId = $('<td></td>').text(id);
        const tdTitle = $('<td></td>').text(product.title);
        const tdBrand = $('<td></td>').text(product.brand);
        const tdPrice = $('<td></td>').text(product.price);
        const btnEdit = $('<button></button>').addClass(['btn','btn-secondary']).text('Alterar');
        const tdButton = $('<td></td>');
        btnEdit.on('click', () => {
            onProductSelected.trigger('success', product);
        });
        const btnRemove = $('<button></button>').addClass(['btn','btn-danger']).text('Apagar');
        btnRemove.on('click', async () => {
            try {
                const product = await this.productService.delete(id);
                onProductDeleted.trigger('success', product);
            } catch (error) {
                onProductDeleted.trigger('error', error);
            }
        });
        tdButton.append([btnEdit, btnRemove]);
        tr.append([tdId, tdTitle, tdBrand, tdPrice, tdButton]);
        return tr;
    }

    updateList() {
        const list = this.list.find('tbody');
        list.empty();
        this.products.forEach(product => {
            list.append(this.htmlItem(product));
        });
    }

    deleteProductToList(data: Product) {
        this.products = this.products.filter(product => (product.id !== data.id));
        this.updateList();
    }
}

export default ProductList;