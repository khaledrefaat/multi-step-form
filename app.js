import Store from './services/Store.js';
import { PersonalInfo } from './components/PersonalInfo.js';
import { SelectPlan } from './components/SelectPlan.js';
import { Addons } from './components/Addons.js';
import { Summary } from './components/Summary.js';
import { ContentHeader } from './components/ContentHeader.js';
import { NavigationButtons } from './components/NavigationButtons.js';
import { ConfirmPage } from './components/ConfirmPage.js';
import Router from './services/Router.js';
import { loadData } from './services/handelData.js';

window.app = {};
app.store = Store;
app.router = Router;

document.addEventListener('DOMContentLoaded', () => {
  app.router.init();
  loadData();
});
