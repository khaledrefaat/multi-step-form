import CssLoader from '../services/CssLoader.js';
import { updateData } from '../services/handelData.js';
import { $, $$, getPrice } from '../utils/helperFunctions.js';

export class SelectPlan extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/SelectPlan.css');
  }

  updatePrice(yearly) {
    $$('.plan', this.root).forEach(plan => {
      $$('p', plan).forEach(plan => {
        const priceText = plan.textContent;
        const price = getPrice(priceText);

        const newPrice = yearly ? price * 10 : price / 10;
        const newPriceText = `$${newPrice}/${yearly ? 'yr' : 'mo'}`;

        plan.textContent = newPriceText;
      });

      $('span', plan).style.display = yearly ? 'inline-block' : 'none';
    });
  }

  toggleAnnualPlan() {
    const checkBox = $('input[type="checkbox"]', this.root);

    function updateAddons(yearly) {
      let oldData = app.store.addOns;
      app.store.addOns = [];
      oldData.forEach(addon => {
        let newPrice = getPrice(addon.price);
        newPrice = yearly ? newPrice * 10 : newPrice / 10;
        const newPriceText = `$${newPrice}/${yearly ? 'yr' : 'mo'}`;

        app.store.addOns = [
          ...app.store.addOns,
          { name: addon.name, price: newPriceText },
        ];
      });
    }

    checkBox.addEventListener('click', () => {
      $('.monthly', this.root).classList.toggle('active', !checkBox.checked);
      $('.yearly', this.root).classList.toggle('active', checkBox.checked);

      // switch between yearly and monthly price
      this.updatePrice(checkBox.checked);
      this.updateStore($('.active-plan', this.root));
      if (app.store.addOns && app.store.addOns.length > 0)
        updateAddons(checkBox.checked);
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
    // for some reason when i put this function inside the initialData function it causes a lot of rerender bug
    if (app.store.selectedPlan && app.store.selectedPlan.yearly)
      this.updatePrice(app.store.selectedPlan.yearly);

    $$('.plan', this.root).forEach(plan => {
      plan.addEventListener('click', () => {
        this.togglePlan();
        plan.classList.add('active-plan');
        this.updateStore(plan);
      });
    });

    window.addEventListener('selectedPlanChanged', () => {
      updateData();

      this.initialData();
    });
  }
}

customElements.define('select-plan', SelectPlan);
