import $ from 'jquery';
import {IComponent} from "./IComponent";
import {Home} from "./Home";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import {onScreenSetContent} from "../events/screen";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export class Menu implements IComponent {
    private nav: JQuery<HTMLElement>;

    constructor() {
        this.nav = $('<nav></nav>');
    }

    render(): Promise<JQuery<HTMLElement> | HTMLElement> {
        this.nav = $(`
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <a class="navbar-brand" href="#home" data-link="true">
    <img src="assets/imgs/logo.png" alt="Logo">
  </a>
  <button id="menu" class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-nav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="navbar-collapse collapse" id="navbar-nav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#customer-create" data-link="true">Cadastro de Clientes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#customer-list" data-link="true">Listagem de Clientes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#product-create" data-link="true">Cadastro de Produtos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#product-list" data-link="true">Listagem de Produtos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#contact-form" data-link="true">Contact</a>
      </li>
  </div>
</nav>
    `);
        return new Promise(resolve => {
            this.bindEvents();
            resolve(this.nav);
        });
    }

    bindEvents() {
        const navBurger = this.nav.find('#menu');
        if (!navBurger.length) {
            return;
        }
        const target = navBurger.data('bs-target');
        const $target = this.nav.find(`${target}`);
        const closeNavBurger = () => {
            navBurger.removeClass('collapsed');
            $target.removeClass('show');
        };
        navBurger.on('click', () => {
            navBurger.toggleClass('collapsed');
            $target.toggleClass('show');
        });
        this.nav.find('[data-link="true"]').on('click', (e) => {
            closeNavBurger();
            const href = $(e.currentTarget).attr('href');
            let screen;
            if (href === "#customer-create") {
                screen = new CustomerForm();
            } else if (href === "#customer-list") {
                screen = new CustomerList();
            } else if (href === "#product-create") {
                screen = new ProductForm();
            } else if (href === "#product-list") {
                screen = new ProductList();
            } else {
                screen = new Home();
            }
            onScreenSetContent.trigger('success', screen);
        });
        this.nav.find(`[data-link="customer-create"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new CustomerForm());
        });
        this.nav.find(`[data-link="customer-list"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new CustomerList());
        });
        this.nav.find(`[data-link="product-create"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new ProductForm());
        });
        this.nav.find(`[data-link="product-list"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new ProductList());
        });
        this.nav.find(`[data-link="contact-form"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new Home());
        });
    }
}