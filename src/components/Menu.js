export class Menu {
    constructor() {
        this.nav = $('<nav></nav>');
    }

    render() {
        this.nav = $(`
<nav class="navbar" role="navigation" aria-label="main navigation">
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
        return this.nav;
    }

    bindEvents(callbacks) {
        const navBurger = this.nav.find('#menu');
        if (navBurger.length > 0) {
            navBurger.on('click', () => {
                const target = navBurger.data('target');
                const $target = $('#' + target);

                navBurger.toggleClass('is-active');
                $target.toggleClass('is-active');
            });
        }
        for (const id in callbacks) {
            const callback = callbacks[id];
            this.nav.find(`[data-link="${id}"]`).on('click', () => {
                callback();
                navBurger.trigger('click');
            });
        }
    }
}