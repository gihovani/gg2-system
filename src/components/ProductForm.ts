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
        this.btnNew.addClass('is-hidden');
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
        this.form = $(`<form id="productForm">
            <h1 class="title">Cadastro de Produtos</h1>
            <input type="hidden" id="id" name="id">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="name">Nome:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <input class="input" type="text" id="name" name="name" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="price">Preço:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <input class="input" type="text" id="price" name="price" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control is-fullwidth">
                    <button class="button is-parent is-hidden btn-new" type="button">Novo</button>
                    <button class="button is-primary" type="submit">Salvar</button>
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
                this.btnNew.removeClass('is-hidden');
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