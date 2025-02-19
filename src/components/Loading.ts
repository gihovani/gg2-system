import {IComponent} from "./IComponent";

export class Loading implements IComponent {
    render(): Promise<JQuery<HTMLElement> | HTMLElement> {
        return new Promise(resolve => {
            resolve($(`<main>
    <div class="notification is-info">
    carregando...
    </div>
</main>`));
        });
    }
}