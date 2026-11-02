import { CURRENCY, LOCALE } from '../config'

const formatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  trailingZeroDisplay: 'stripIfInteger',
})

export function formatPrice(value) {
  return formatter.format(value)
}
