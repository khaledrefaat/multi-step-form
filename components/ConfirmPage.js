import CssLoader from '../services/CssLoader.js';
import { clearData } from '../services/handelData.js';
import { $ } from '../utils/helperFunctions.js';

export class ConfirmPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/ConfirmPage.css');
  }
  connectedCallback() {
    const template = $('#confirm-page');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    clearData();
  }
}

customElements.define('confirm-page', ConfirmPage);
