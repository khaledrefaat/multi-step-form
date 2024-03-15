import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

export class PersonalInfo extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/PersonalInfo.css');
  }

  connectedCallback() {
    const template = $('#personal-info');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    $('[slot="title"]', this.root).textContent = 'Personal info';
    $('[slot="description"]', this.root).textContent =
      'Please provide your name, email address, and phone number.';
    $('[slot="next-btn"]', this.root).href = '/select-plan';

    $('[slot="back-btn"]', this.root).style.display = 'none';
  }
}

customElements.define('personal-info', PersonalInfo);
