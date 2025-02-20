import $ from 'jquery';
import {onProductCreated, onProductUpdated} from '../events/product';
import {DataComponent, IComponent} from './IComponent';
import ProductService from "../services/ProductService";


class ProductForm extends DataComponent implements IComponent {
    private form: JQuery<HTMLFormElement>;
    private id: JQuery<HTMLInputElement>;
    private name: JQuery<HTMLInputElement>;
    private price: JQuery<HTMLInputElement>;
    private btnNew: JQuery<HTMLInputElement>;
    private productService: ProductService;

    constructor() {
        super();
        this.form = $('<form></form>');
        this.id = $('<input />');
        this.name = $('<input />');
        this.price = $('<input />');
        this.btnNew = $('<button></button>');
        this.productService = new ProductService();
    }

    reset() {
        this.btnNew.addClass('visually-hidden');
        this.form.trigger('reset');
        this.id.val('');
        this.name.val('');
        this.price.val(''); // Limpe o campo de preço
    }

    async create() {
        const name = <string>this.name.val();
        const price = parseFloat(<string>this.price.val());
        try {
            const product = await this.productService.create({id: '', name, price});
            this.reset();
            onProductCreated.trigger('success', product);
        } catch (error) {
            onProductCreated.trigger('error', error);
        }
    }

    async update() {
        const id = <string>this.id.val();
        const name = <string>this.name.val();
        const price = parseFloat(<string>this.price.val());
        try {
            const product = await this.productService.update(id, {id, name, price});
            this.reset();
            onProductUpdated.trigger('success', product);
        } catch (error) {
            onProductUpdated.trigger('error', error);
        }
    }

    async handleSubmit(event: Event) {
        event.preventDefault();
        const id = <string>this.id.val();
        if (id) {
            return await this.update();
        }
        return await this.create();
    }

    render(): Promise<JQuery<HTMLElement>> {
        this.form = $(`<form id="product-create">
            <h1 class="title">Cadastro de Produtos</h1>
            <input type="hidden" id="id" name="id">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="name">Nome:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" id="name" name="name" autocomplete="off" required>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="price">Preço:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" id="price" name="price" autocomplete="off" required>
                </div>
            </div>
            <div class="row">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-secondary visually-hidden btn-new" type="reset">Novo</button>
                    <button class="btn btn-primary" type="submit">Salvar</button>
                </div>
            </div>
        </form>`);

        return new Promise<JQuery<HTMLElement>>(resolve => {
            this.btnNew = this.form.find('button.btn-new');
            this.id = this.form.find('#id');
            this.name = this.form.find('#name');
            this.price = this.form.find('#price');
            if (this.data && this.data.id) {
                this.id.val(this.data.id);
                this.name.val(this.data.name);
                this.price.val(this.data.price);
                this.btnNew.removeClass('visually-hidden');
            }
            this.bindEvents();
            resolve(this.form);
        });
    }

    bindEvents() {
        this.btnNew.on('click', this.reset.bind(this));
        this.form.on('submit', this.handleSubmit.bind(this));
    }
}

export default ProductForm;