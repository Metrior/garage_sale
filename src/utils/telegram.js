import { TELEGRAM_USERNAME } from '../config'
import { formatItemPrice, formatPrice } from './formatPrice'

export function buildCheckoutMessage(items, total) {
  const lines = items.map(
    (item, index) => `${index + 1}. ${item.title} — ${formatItemPrice(item)}`,
  )

  return [
    "Привет! Я бы хотел/а купить вот эти вещи:",
    '',
    ...lines,
    '',
    `Сумма: ${formatPrice(total)}`,
  ].join('\n')
}

export function buildTelegramCheckoutUrl(items, total) {
  const text = encodeURIComponent(buildCheckoutMessage(items, total))
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`
}
