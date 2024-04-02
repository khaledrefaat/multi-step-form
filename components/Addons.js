import CssLoader from '../services/CssLoader.js';
import { updateData } from '../services/handelData.js';
import { $, $$ } from '../utils/helperFunctions.js';

export class Addons extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('/components/Addons.css');
  }

  updateStore(addon) {
    let name = $('h4', addon).textContent;
    let price = $('.option > p', addon).textContent;
    if (!app.store.addOns) app.store.addOns = [];

    let foundAddon = app.store.addOns.find(addon => addon.name === name);
    // keep in mind that if you updated the array with the regular methods push and pop or just use splice, it will not trigger the event, you have to use = to trigger the event
    if (app.store.addOns.length > 0 && foundAddon) {
      const newAddons = app.store.addOns.filter(addon => addon.name !== name);
      app.store.addOns = newAddons;
    } else app.store.addOns = [...app.store.addOns, { name, price }];
  }

  loadInitialData() {
    this.toggleAnnualPlan();
    if (app.store.addOns && app.store.addOns.length > 0) {
      $$('.option', this.root).forEach(addon => {
        let name = $('h4', addon).textContent;

        if (app.store.addOns.find(addon => addon.name == name)) {
          addon.classList.add('selected');
        }
      });
    }
  }

  toggleAnnualPlan() {
    if (app.store.selectedPlan && app.store.selectedPlan.yearly) {
      // switch between yearly and monthly price
      $$('.option', this.root).forEach(addon => {
        const addonPrice = $('.option > p', addon);
        const priceText = addonPrice.textContent;
        const price = priceText.replace(/\D/g, '');

        const newPrice = price * 10;
        const newPriceText = `$${newPrice}/${'yr'}`;

        addonPrice.textContent = newPriceText;
      });
    }
  }

  connectedCallback() {
    const template = $('#addons');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    $('[slot="title"]', this.root).textContent = 'Pick add-ons';
    $('[slot="description"]', this.root).textContent =
      'Add-ons help enhance your gaming experience';
    $('[slot="back-btn"]', this.root).href = '/select-plan';
    $('[slot="next-btn"]', this.root).href = '/summary';

    $$('.option', this.root).forEach(addon => {
      addon.addEventListener('click', () => {
        addon.classList.toggle('selected');
        this.updateStore(addon);
      });
    });

    this.loadInitialData();

    window.addEventListener('selectedPlanChanged', () => {
      this.loadInitialData();
      updateData();
    });

    window.addEventListener('addOnsChanged', () => {
      updateData();
    });
  }
}

customElements.define('add-ons', Addons);
