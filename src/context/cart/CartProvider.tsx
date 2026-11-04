import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CART_STORAGE_KEY } from '../../config'
import type { CartContextValue, Item } from '../../types'
import { CartContext } from './CartContext'
import { useItems } from '../items'

function loadCartIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? [...new Set(parsed.filter((id) => typeof id === 'string'))] : []
  } catch {
    return []
  }
}

function saveCartIds(ids: string[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory cart still works.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { items, status } = useItems()
  const [cartIds, setCartIds] = useState(loadCartIds)
  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items])

  // Ids of items that no longer exist (deleted by the admin) are skipped here and dropped from
  // storage below, but only once the items have loaded, so a slow or failed load never empties the cart.
  const cartItems = useMemo(() => cartIds.map((id) => itemsById.get(id)).filter((item): item is Item => item !== undefined), [cartIds, itemsById])

  useEffect(() => {
    if (status === 'ready') saveCartIds(cartItems.map((item) => item.id))
  }, [status, cartItems])

  const addToCart = useCallback(
    (id: string) => {
      if (!itemsById.has(id)) return
      setCartIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    },
    [itemsById],
  )

  const removeFromCart = useCallback((id: string) => {
    setCartIds((ids) => ids.filter((cartId) => cartId !== id))
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const inCart = new Set(cartItems.map((item) => item.id))
    return {
      cartItems,
      count: cartItems.length,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      isInCart: (id) => inCart.has(id),
      addToCart,
      removeFromCart,
    }
  }, [cartItems, addToCart, removeFromCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
