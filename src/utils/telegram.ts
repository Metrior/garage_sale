import { TELEGRAM_USERNAME } from '../config'
import type { Item } from '../types'
import { formatItemPrice, formatPrice } from './formatPrice'

export function buildCheckoutMessage(items: Item[], total: number): string {
  const lines = items.map(
    (item, index) => `${index + 1}. ${item.title} — ${formatItemPrice(item, 'за штуку')}`,
  )

  return [
    "Привет! Я бы хотел/а купить вот эти вещи:",
    '',
    ...lines,
    '',
    `Сумма: ${formatPrice(total)}`,
  ].join('\n')
}

export function buildTelegramCheckoutUrl(items: Item[], total: number): string {
  const text = encodeURIComponent(buildCheckoutMessage(items, total))
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`
}
