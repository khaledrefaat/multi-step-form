import CssLoader from '../services/CssLoader.js';
import { $ } from '../utils/helperFunctions.js';

export class PersonalInfo extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/PersonalInfo.css');
  }

  validateName(name) {
    // Improved regular expression for broader name validation:
    const regex = /^[a-zA-ZÀ-ÖØ-öø'\-\s]+$/;

    // Test the name against the regular expression
    return regex.test(name);
  }

  validateEmail(email) {
    // Improved regular expression for basic email validation:
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Test the email against the regular expression
    return regex.test(email);
  }

  validateEgyptianPhoneNumber(phoneNumber) {
    // Regex for Egyptian phone numbers:
    const regex = /^01[0-25][0-9]{8}$/;

    // Test the phone number against the regex
    return regex.test(phoneNumber);
  }

  validateInput(input, validateFunction) {
    input.addEventListener('focus', event => {
      input.parentNode.classList.remove('error');
    });

    input.addEventListener('input', event => {
      if (!validateFunction(input.value)) {
        input.parentNode.classList.add('error');
      } else {
        input.parentNode.classList.remove('error');
      }
    });
  }

  connectedCallback() {
    const template = $('#personal-info');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const nameInput = $('#name', this.root);
    const emailInput = $('#email', this.root);
    const phoneInput = $('#phone', this.root);

    this.validateInput(nameInput, this.validateName);
    this.validateInput(emailInput, this.validateEmail);
    this.validateInput(phoneInput, this.validateEgyptianPhoneNumber);

    $('[slot="title"]', this.root).textContent = 'Personal info';
    $('[slot="description"]', this.root).textContent =
      'Please provide your name, email address, and phone number.';
    $('[slot="next-btn"]', this.root).href = '/select-plan';

    $('[slot="back-btn"]', this.root).style.display = 'none';
  }
}

customElements.define('personal-info', PersonalInfo);
