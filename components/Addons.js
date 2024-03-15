import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

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
  }
}

customElements.define('add-ons', Addons);
