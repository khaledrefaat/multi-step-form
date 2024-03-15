import CssLoader from '../services/CssLoader.js';
import { $, $$ } from '../utils/helperFunctions.js';

export class NavigationButtons extends HTMLElement {
  constructor() {
    super();

    this.cssLoader = new CssLoader(this);
    this.cssLoader.loadCss('/components/NavigationButtons.css');
  }

  connectedCallback() {
    const template = $('#navigation-buttons');
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const buttons = $$('a', this);

    buttons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const url = button.getAttribute('href');
        app.router.go(url);
      });
    });
  }
}

customElements.define('navigation-buttons', NavigationButtons);
