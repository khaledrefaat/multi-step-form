import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

export class ContentHeader extends HTMLElement {
  constructor() {
    super();
    this.cssLoader = new CssLoader(this);
    this.cssLoader.loadCss('/components/ContentHeader.css');
  }

  connectedCallback() {
    const template = $('#content-header');
    const content = template.content.cloneNode(true);

    this.appendChild(content);
  }
}

customElements.define('content-header', ContentHeader);
