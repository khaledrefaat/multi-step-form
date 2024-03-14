import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

export class SelectPlan extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/SelectPlan.css');
  }

  connectedCallback() {
    const template = $('#select-plan');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }
}

customElements.define('select-plan', SelectPlan);
