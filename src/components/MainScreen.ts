import $ from 'jquery';
import {Footer} from './Footer';
import {Home} from './Home';
import {Loading} from './Loading';
import {Menu} from "./Menu";
import {IComponent} from "./IComponent";
import {onScreenSetContent} from "../events/screen";

class MainScreen {
    private container: JQuery<HTMLElement>;
    private menu: IComponent;
    private footer: IComponent;
    private content: IComponent;
    private loading: HTMLElement | JQuery<HTMLElement>;

    constructor(container: JQuery<HTMLElement>) {
        this.container = container;
        this.menu = new Menu();
        this.footer = new Footer();
        this.content = new Home();
        this.loading = $('<div>loading...</div>');
    }

    async render() {
        this.container.append(await this.menu.render());
        this.container.append(await this.content.render());
        this.container.append(await this.footer.render());
        this.bindEvents();
    }

    bindEvents() {
        if (!this.loading) {
            new Loading().render().then(content => {
                this.loading = content
            });
        }
        onScreenSetContent.on('success', async (component: IComponent) => {
            this.setContent(this.loading);
            this.content = component;
            const content = await component.render();
            this.setContent(content);
        });
    }

    setContent(content: HTMLElement | JQuery<HTMLElement>) {
        $('main').empty().append(content);
    }
}

export default MainScreen;