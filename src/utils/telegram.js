import { TELEGRAM_USERNAME } from '../config'
import { formatPrice } from './formatPrice'

export function buildCheckoutMessage(items, total) {
  const lines = items.map(
    (item, index) => `${index + 1}. ${item.title} — ${formatPrice(item.price)}`,
  )

  return [
    "Hi! I'd like to buy these items from your garage sale:",
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total)}`,
  ].join('\n')
}

export function buildTelegramCheckoutUrl(items, total) {
  const text = encodeURIComponent(buildCheckoutMessage(items, total))
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`
}
