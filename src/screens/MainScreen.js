import {Menu} from '../components/Menu';
import {Footer} from '../components/Footer';
import {Content} from '../components/Content';
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";
import {Loading} from "../components/Loading";

export class MainScreen {
    constructor(container) {
        this.container = container;
        this.menu = new Menu();
        this.footer = new Footer();
        this.content = new Content();
    }

    render() {
        this.container.append(this.menu.render());
        this.container.append(this.content.render());
        this.container.append(this.footer.render());
        this.bindEvents();
    }

    bindEvents() {
        this.bindMenuEvents();
    }

    async bindMenuEvents() {
        const callbacks = {
            'home': () => {
                this.setContent(this.content.render());
            },
            'contact-form': () => {
                this.setContent(this.content.render());
            },
            'customer-create': () => {
                this.setContent(new CustomerForm().render());
            },
            'customer-list': () => {
                const customerList = new CustomerList();
                this.setContent(new Loading().render());
                customerList.render().then(content => {
                    this.setContent(content);
                });
            },
        };
        this.menu.bindEvents(callbacks);
    }

    setContent(content) {
        $('main').empty().append(content);
    }
}