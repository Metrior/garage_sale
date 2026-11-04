import { CURRENCY, LOCALE } from '../config'

const formatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  trailingZeroDisplay: 'stripIfInteger',
})

// The currency sign on its own, e.g. "₪" (used as the price field's prefix).
export const CURRENCY_SYMBOL = formatter.formatToParts(0).find((part) => part.type === 'currency')?.value ?? CURRENCY

export function formatPrice(value) {
  return formatter.format(value)
}

// One-line price for lists and messages, e.g. "₪40 (за штуку)".
export function formatItemPrice(item) {
  const price = formatPrice(item.price)
  return item.tag ? `${price} (${item.tag})` : price
}
