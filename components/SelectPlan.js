import CssLoader from '../services/CssLoader.js';
import { $, $$ } from '../utils/helperFunctions.js';

export class SelectPlan extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/SelectPlan.css');
  }

  toggleAnnualPlan() {
    const checkBox = $('input[type="checkbox"]', this.root);

    checkBox.addEventListener('click', () => {
      $('.monthly', this.root).classList.toggle('active', !checkBox.checked);
      $('.yearly', this.root).classList.toggle('active', checkBox.checked);

      // switch between yearly and monthly price
      $$('.plan', this.root).forEach(plan => {
        $$('p', plan).forEach(plan => {
          const priceText = plan.textContent;
          const price = priceText.replace(/\D/g, '');

          const newPrice = checkBox.checked ? price * 10 : price / 10;
          const newPriceText = `$${newPrice}/${checkBox.checked ? 'yr' : 'mo'}`;
        });

        $('span', plan).style.display = checkBox.checked
          ? 'inline-block'
          : 'none';
      });
    });
  }

  togglePlan() {
    $$('.plan', this.root).forEach(plan => {
      plan.classList.remove('active-plan');
    });
  }

  connectedCallback() {
    const template = $('#select-plan');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    $('[slot="title"]', this.root).textContent = 'Select your plan';
    $('[slot="description"]', this.root).textContent =
      'You have the option of monthly or yearly billing.';
    $('[slot="back-btn"]', this.root).href = '/';
    $('[slot="next-btn"]', this.root).href = '/add-ons';

    this.toggleAnnualPlan();

    $$('.plan', this.root).forEach(plan => {
      plan.addEventListener('click', () => {
        this.togglePlan();
        plan.classList.add('active-plan');
      });
    });
  }
}

customElements.define('select-plan', SelectPlan);
