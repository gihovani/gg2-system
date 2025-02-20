import $ from 'jquery';
import {IComponent} from "./IComponent";

export class Footer implements IComponent {
    render(): Promise<JQuery<HTMLElement> | HTMLElement> {
        return new Promise(resolve => {
            resolve($(`<footer class="footer mt-auto py-3 bg-body-tertiary">
  <div class="container text-center">
    <span class="text-body-secondary">
      <strong>GG2-System</strong> by <a href="https://gg2.com.br" target="_blank">GG2</a>.
      The source code is licensed
      <a href="https://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
    </span>
  </div>
</footer>`));
        });
    }
}