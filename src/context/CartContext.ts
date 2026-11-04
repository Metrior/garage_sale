import { createContext } from 'react'
import type { Item } from '../types'

export interface CartContextValue {
  cartItems: Item[]
  count: number
  total: number
  isInCart: (id: string) => boolean
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
