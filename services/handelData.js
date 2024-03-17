export function loadData() {
  let localInfo = localStorage.getItem('personalInfo');
  let localAddon = localStorage.getItem('addons');
  let localPlan = localStorage.getItem('selectedPlan');

  if (localInfo) app.store.personalInfo = JSON.parse(localInfo);

  if (localAddon) app.store.addOns = JSON.parse(localAddon);

  if (localPlan) app.store.selectedPlan = JSON.parse(localPlan);
}

export function updateData() {
  if (app.store.personalInfo)
    localStorage.setItem(
      'personalInfo',
      JSON.stringify(app.store.personalInfo)
    );

  if (app.store.addOns)
    localStorage.setItem('addons', JSON.stringify(app.store.addOns));

  if (app.store.selectedPlan)
    localStorage.setItem(
      'selectedPlan',
      JSON.stringify(app.store.selectedPlan)
    );
}
