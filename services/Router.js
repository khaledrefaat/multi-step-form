import { $, $$ } from '../utils/helperFunctions.js';

const Router = {
  init: function () {
    $$('.navlink').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.go(url);
      });
    });
    window.addEventListener('popstate', event => {
      if (event.state) this.go(event.state.route, false);
    });
    this.go(location.pathname);
  },
  go: function (route, addToHistory = true) {
    if (addToHistory) history.pushState({ route }, '', route);

    let pageElement = null;
    switch (route) {
      case '/select-plan':
        pageElement = document.createElement('select-plan');
        break;
      case '/add-ons':
        pageElement = document.createElement('add-ons');
        break;
      case '/summary':
        pageElement = document.createElement('summary-page');
        break;
      default:
        pageElement = document.createElement('personal-info');
    }

    $$('.navlink').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === route) link.classList.add('active');
    });
    const cache = $('#step');
    cache.innerHTML = '';
    cache.appendChild(pageElement);
  },
};

export default Router;
