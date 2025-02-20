import $ from 'jquery';
import {Footer} from './Footer';
import {Home} from './Home';
import {Menu} from "./Menu";
import {IComponent} from "./IComponent";
import {onScreenSetContent} from "../events/screen";

class MainScreen {
    private container: JQuery<HTMLElement>;
    private menu: IComponent;
    private footer: IComponent;
    private content: IComponent;
    private loading: JQuery<HTMLElement>;

    constructor(container: JQuery<HTMLElement>) {
        this.container = container;
        this.menu = new Menu();
        this.footer = new Footer();
        this.content = new Home();
        this.loading = this.loadingContent();
    }

    async render() {
        this.container.append(this.loading);
        this.container.append(await this.menu.render());
        this.container.append(await this.content.render());
        this.container.append(await this.footer.render());
        this.bindEvents();
    }

    bindEvents() {
        onScreenSetContent.on('success', async (component: IComponent) => {
            this.showLoading();
            try {
                const content = await component.render();
                this.setContent(content);
            } finally {
                this.hideLoading();
            }
        });
    }

    setContent(content: HTMLElement | JQuery<HTMLElement>) {
        $('main').empty().append(content);
    }

    loadingContent(): JQuery<HTMLElement> {
        const loading = $('<div class="fixed-top progress visually-hidden" style="height: 5px"></div>');
        const loadingContent = $('<div class="progress-bar progress-bar-striped progress-bar-animated" style="transition-duration: 500ms"></div>');
        loading.append(loadingContent);
        return loading;
    }

    showLoading() {
        this.loading.removeClass(['visually-hidden']).addClass('w-100');
    }

    hideLoading() {
        this.loading.removeClass('w-100').addClass(['visually-hidden']);
    }
}

export default MainScreen;