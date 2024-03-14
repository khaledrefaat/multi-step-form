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
  }
}

customElements.define('summary-page', Summary);
