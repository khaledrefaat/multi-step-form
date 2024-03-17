import CssLoader from '../services/CssLoader.js';
import { updateData } from '../services/handelData.js';
import { $ } from '../utils/helperFunctions.js';

export class PersonalInfo extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/PersonalInfo.css');
  }

  validateName(name) {
    const regex = /^[a-zA-ZÀ-ÖØ-öø'\-\s]+$/;

    if (regex.test(name))
      app.store.personalInfo = { ...app.store.personalInfo, name };
    return regex.test(name);
  }

  validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (regex.test(email))
      app.store.personalInfo = { ...app.store.personalInfo, email };
    return regex.test(email);
  }

  validateEgyptianPhoneNumber(phoneNumber) {
    // Regex for Egyptian phone numbers:
    const regex = /^01[0-25][0-9]{8}$/;

    if (regex.test(phoneNumber))
      app.store.personalInfo = { ...app.store.personalInfo, phoneNumber };
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

  initialData(nameInput, emailInput, phoneInput) {
    let storeData = app.store.personalInfo;

    if (storeData) {
      storeData.name
        ? (nameInput.value = storeData.name)
        : (nameInput.value = '');

      storeData.email
        ? (emailInput.value = storeData.email)
        : (emailInput.value = '');

      storeData.phoneNumber
        ? (phoneInput.value = storeData.phoneNumber)
        : (phoneInput.value = '');
    }
  }

  connectedCallback() {
    const template = $('#personal-info');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const nameInput = $('#name', this.root);
    const emailInput = $('#email', this.root);
    const phoneInput = $('#phone', this.root);

    this.initialData(nameInput, emailInput, phoneInput);

    this.validateInput(nameInput, this.validateName);
    this.validateInput(emailInput, this.validateEmail);
    this.validateInput(phoneInput, this.validateEgyptianPhoneNumber);

    $('[slot="title"]', this.root).textContent = 'Personal info';
    $('[slot="description"]', this.root).textContent =
      'Please provide your name, email address, and phone number.';
    $('[slot="next-btn"]', this.root).href = '/select-plan';

    $('[slot="back-btn"]', this.root).style.display = 'none';
    window.addEventListener('personalInfoChanged', () => {
      updateData();
      this.initialData(nameInput, emailInput, phoneInput);
    });
  }
}

customElements.define('personal-info', PersonalInfo);
