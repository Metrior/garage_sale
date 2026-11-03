import { LOCALE } from '../config'

const collator = new Intl.Collator(LOCALE, { sensitivity: 'base', numeric: true })
const byTitle = (a, b) => collator.compare(a.title, b.title)

// Items with the same price fall back to alphabetical order.
export const SORT_OPTIONS = [
  { value: 'price-desc', label: 'Price: high to low', compare: (a, b) => b.price - a.price || byTitle(a, b) },
  { value: 'price-asc', label: 'Price: low to high', compare: (a, b) => a.price - b.price || byTitle(a, b) },
  { value: 'title-asc', label: 'Title: A to Z', compare: byTitle },
  { value: 'title-desc', label: 'Title: Z to A', compare: (a, b) => byTitle(b, a) },
]

export const DEFAULT_SORT = 'price-desc'

export function sortItems(items, sortValue) {
  const option = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0]
  return [...items].sort(option.compare)
}
