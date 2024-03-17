import CssLoader from '../services/CssLoader.js';
import { updateData } from '../services/handelData.js';
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
        this.updateStore(plan);

        $$('p', plan).forEach(plan => {
          const priceText = plan.textContent;
          const price = priceText.replace(/\D/g, '');

          const newPrice = checkBox.checked ? price * 10 : price / 10;
          const newPriceText = `$${newPrice}/${checkBox.checked ? 'yr' : 'mo'}`;

          plan.textContent = newPriceText;
        });

        $('span', plan).style.display = checkBox.checked
          ? 'inline-block'
          : 'none';
      });

      if (app.store.addOns && app.store.addOns.length > 0) {
        function updateAddons(yearly) {
          let oldData = app.store.addOns;
          app.store.addOns = [];
          oldData.forEach(addon => {
            let newPrice = Number(addon.price.replace(/\D/g, ''));
            newPrice = yearly ? newPrice * 10 : newPrice / 10;
            const newPriceText = `$${newPrice}/${yearly ? 'yr' : 'mo'}`;
            app.store.addOns = [
              ...app.store.addOns,
              { name: addon.name, price: newPriceText },
            ];
          });
        }

        updateAddons(checkBox.checked);
      }
    });
  }

  togglePlan() {
    $$('.plan', this.root).forEach(plan => {
      plan.classList.remove('active-plan');
    });
  }

  initialData() {
    let storeData = app.store.selectedPlan;
    if (storeData) {
      $$('.plan', this.root).forEach(plan => {
        if ($('h4', plan).textContent === storeData.name) {
          plan.classList.add('active-plan');
        } else {
          plan.classList.remove('active-plan');
        }
      });
      $('input[type="checkbox"]', this.root).checked = storeData.yearly;
    }
  }

  updateStore(plan) {
    app.store.selectedPlan = {
      name: $('h4', plan).textContent,
      price: $('p', plan).textContent,
      yearly: $('input[type="checkbox"]', this.root).checked,
    };
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
    this.initialData();
    $$('.plan', this.root).forEach(plan => {
      plan.addEventListener('click', () => {
        this.togglePlan();
        this.updateStore(plan);
        plan.classList.add('active-plan');
      });
    });

    window.addEventListener('selectedPlanChanged', () => {
      updateData();

      this.initialData();
    });
  }
}

customElements.define('select-plan', SelectPlan);
