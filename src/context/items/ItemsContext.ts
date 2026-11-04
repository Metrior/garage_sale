import { createContext } from 'react'
import type { ItemsContextValue } from '../../types'

export const ItemsContext = createContext<ItemsContextValue | null>(null)
