export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

export function getPrice(price) {
  return Number(price.replace(/\D/g, ''));
}
