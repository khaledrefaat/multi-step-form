import CssLoader from '../services/CssLoader.js';
import { $, $$ } from '../utils/helperFunctions.js';

export class Addons extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/Addons.css');
  }

  connectedCallback() {
    const template = $('#addons');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    $('[slot="title"]', this.root).textContent = 'Pick add-ons';
    $('[slot="description"]', this.root).textContent =
      'Add-ons help enhance your gaming experience';
    $('[slot="back-btn"]', this.root).href = '/select-plan';
    $('[slot="next-btn"]', this.root).href = '/summary';

    $$('.option', this.root).forEach(addon => {
      addon.addEventListener('click', () => {
        addon.classList.toggle('selected');
      });
    });
  }
}

customElements.define('add-ons', Addons);
