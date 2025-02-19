import {IComponent} from "./IComponent";

export class Home implements IComponent {

    render(): Promise<JQuery<HTMLElement>> {
        return new Promise((resolve) => {
            resolve($(`<main>
    <div class="notification is-success">
      Esta é uma notificação de sucesso!
    </div>
</main>`));
        })
    }
}