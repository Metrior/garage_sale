import { CURRENCY, LOCALE } from '../config'

const formatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  trailingZeroDisplay: 'stripIfInteger',
})

export function formatPrice(value) {
  return formatter.format(value)
}

// One-line price for lists and messages, e.g. "₪40 (за штуку)".
export function formatItemPrice(item) {
  const price = formatPrice(item.price)
  return item.tag ? `${price} (${item.tag})` : price
}
