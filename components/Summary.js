import CssLoader from '../services/CssLoader.js';
import { $, getPrice } from '../utils/helperFunctions.js';

export class Summary extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/Summary.css');
  }

  checkStore(confirmButton) {
    const { selectedPlan, personalInfo, addOns } = app.store;
    const { name, email, phoneNumber } = personalInfo;
    if (
      name &&
      email &&
      phoneNumber &&
      selectedPlan.name &&
      addOns &&
      addOns.length > 0
    ) {
      confirmButton.classList.remove('disabled');
      confirmButton.href = '/completed';
    }
  }

  connectedCallback() {
    const template = $('#summary');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const confirmButton = $('[slot="next-btn"]', this.root);

    $('[slot="title"]', this.root).textContent = 'Finishing up';
    $('[slot="description"]', this.root).textContent =
      'Double-check everything looks OK before confirming.';
    $('[slot="next-btn"]', this.root).href = '/summary';
    confirmButton.textContent = 'Confirm';
    confirmButton.classList.add('disabled');
    $('[slot="back-btn"]', this.root).href = '/add-ons';

    $('.plan h4', this.root).textContent = `${app.store.selectedPlan.name} (${
      app.store.selectedPlan.yearly ? 'yearly' : 'monthly'
    })`;

    $('.plan > p', this.root).textContent = app.store.selectedPlan.price;

    $('.plan a', this.root).addEventListener('click', e => {
      e.preventDefault();
      const url = $('.plan a', this.root).getAttribute('href');
      app.router.go(url);
    });

    if (app.store.addOns && app.store.addOns.length > 0) {
      const addons = $('.addons', this.root);
      addons.innerHTML = '';
      app.store.addOns.forEach(addon => {
        addons.innerHTML += `
          <div class="addon">
            <span>${addon.name}</span>
            <span>${addon.price}</span>
          </div>
        `;
      });
    }

    if (app.store.selectedPlan) {
      const totalElementDescription = $('.total p', this.root);
      const totalPriceElement = $('.total span', this.root);
      let total = 0;

      total += getPrice(app.store.selectedPlan.price);

      app.store.addOns.forEach(addon => {
        total += getPrice(addon.price);
      });

      if (app.store.selectedPlan.yearly) {
        totalElementDescription.textContent = 'Total(per year)';
        totalPriceElement.textContent = `$${total}/yr`;
      } else {
        totalElementDescription.textContent = 'Total(per month)';
        totalPriceElement.textContent = `$${total}/mo`;
      }
    }

    this.checkStore(confirmButton);

    $('.selected-plan .addons', this.root).textContent;
  }
}

customElements.define('summary-page', Summary);
