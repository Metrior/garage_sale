import { CURRENCY, LOCALE } from '../config'
import type { Item } from '../types'

const formatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  trailingZeroDisplay: 'stripIfInteger',
})

// The currency sign on its own, e.g. "₪" (used as the price field's prefix).
export const CURRENCY_SYMBOL = formatter.formatToParts(0).find((part) => part.type === 'currency')?.value ?? CURRENCY

export function formatPrice(value: number): string {
  return formatter.format(value)
}

// Shown next to the price of items whose `per_item` is set.
export const PER_ITEM_LABEL = 'per item'

// One-line price for lists and messages, e.g. "₪40 (per item)". The Russian checkout message passes "за штуку".
export function formatItemPrice(item: Pick<Item, 'price' | 'per_item' | 'tag'>, perItemLabel = PER_ITEM_LABEL): string {
  const price = formatPrice(item.price)
  const notes = [item.per_item ? perItemLabel : null, item.tag].filter(Boolean)
  return notes.length > 0 ? `${price} (${notes.join(', ')})` : price
}
