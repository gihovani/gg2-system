import {IComponent} from "./IComponent";
import {Home} from "./Home";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import {onScreenSetContent} from "../events/screen";

export class Menu implements IComponent {
    private nav: JQuery<HTMLElement>;

    constructor() {
        this.nav = $('<nav></nav>');
    }

    render(): Promise<JQuery<HTMLElement> | HTMLElement> {
        this.nav = $(`
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#" data-link="home">
      <img src="assets/imgs/logo.png" alt="Logo">
    </a>

    <a id="menu" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="#" data-link="customer-create">Cadastro de Clientes</a>
      <a class="navbar-item" href="#" data-link="customer-list">Listagem de Clientes</a>
      <a class="navbar-item" href="#" data-link="contact-form">Contact</a>
    </div>
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
        const target = navBurger.data('target');
        const $target = this.nav.find(`#${target}`);
        const closeNavBurger = () => {
            navBurger.removeClass('is-active');
            $target.removeClass('is-active');
        };
        navBurger.on('click', () => {
            navBurger.toggleClass('is-active');
            $target.toggleClass('is-active');
        });
        this.nav.find('[data-link="home"]').on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new Home());
        });
        this.nav.find(`[data-link="customer-create"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new CustomerForm());
        });
        this.nav.find(`[data-link="customer-list"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new CustomerList());
        });
        this.nav.find(`[data-link="contact-form"]`).on('click', () => {
            closeNavBurger();
            onScreenSetContent.trigger('success', new Home());
        });
    }
}