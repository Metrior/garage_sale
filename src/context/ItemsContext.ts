import { createContext } from 'react'
import type { Item } from '../types'

// 'loading' until the first fetch finishes, then 'ready'; 'error' if it failed and nothing is loaded.
export type ItemsStatus = 'loading' | 'ready' | 'error'

export interface ItemsContextValue {
  items: Item[]
  status: ItemsStatus
  // Refetches after the admin changes something. A failed refresh keeps the items already shown.
  reload: () => Promise<void>
  // Shows the spinner again and refetches after a failed first load.
  retry: () => void
}

export const ItemsContext = createContext<ItemsContextValue | null>(null)
