export const FILTER_EVENT = 'annsitos:catalog-filter'

export function setCatalogFilter(payload) {
  window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: payload }))
}
