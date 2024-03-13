const Store = {
  personalInfo: null,
  selectedPlan: null,
  addOns: null,
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == 'personalInfo')
      window.dispatchEvent(new Event('personalInfoChanged'));
    if (property == 'selectedPlan')
      window.dispatchEvent(new Event('selectedPlanChanged'));
    if (property == 'addOns') window.dispatchEvent(new Event('addOnsChanged'));
    return true;
  },
  get(target, property) {
    return target[property];
  },
});

export default proxyStore;
