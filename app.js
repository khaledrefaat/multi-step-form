import Store from './services/Store.js';
import { PersonalInfo } from './components/PersonalInfo.js';
import { SelectPlan } from './components/SelectPlan.js';
import { Addons } from './components/Addons.js';
import { Summary } from './components/Summary.js';
import { ContentHeader } from './components/ContentHeader.js';
import Router from './services/Router.js';

window.app = {};
app.store = Store;
app.router = Router;

document.addEventListener('DOMContentLoaded', () => {
  app.router.init();
});
