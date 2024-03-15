import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

export class Summary extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/Summary.css');
  }

  connectedCallback() {
    const template = $('#summary');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    $('[slot="title"]', this.root).textContent = 'Finishing up';
    $('[slot="description"]', this.root).textContent =
      'Double-check everything looks OK before confirming.';
    $('[slot="next-btn"]', this.root).href = '/confirm';
    $('[slot="next-btn"]', this.root).textContent = 'Confirm';
    $('[slot="back-btn"]', this.root).href = '/add-ons';
  }
}

customElements.define('summary-page', Summary);
