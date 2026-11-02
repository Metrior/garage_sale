import { useCallback, useEffect, useMemo, useState } from 'react'
import items from '../data/items.json'
import { CART_STORAGE_KEY } from '../config'
import { CartContext } from './CartContext'

const itemsById = new Map(items.map((item) => [item.id, item]))

// Reads cart ids from localStorage and drops any id that is no longer in items.json.
function loadCartIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return [...new Set(parsed)].filter((id) => itemsById.has(id))
  } catch {
    return []
  }
}

function saveCartIds(ids) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory cart still works.
  }
}

export function CartProvider({ children }) {
  const [cartIds, setCartIds] = useState(loadCartIds)

  // Runs on load (persisting the cleaned-up cart) and after every add/remove.
  useEffect(() => {
    saveCartIds(cartIds)
  }, [cartIds])

  const addToCart = useCallback((id) => {
    if (!itemsById.has(id)) return
    setCartIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartIds((ids) => ids.filter((cartId) => cartId !== id))
  }, [])

  const value = useMemo(() => {
    const cartItems = cartIds.map((id) => itemsById.get(id))
    return {
      cartItems,
      count: cartItems.length,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      isInCart: (id) => cartIds.includes(id),
      addToCart,
      removeFromCart,
    }
  }, [cartIds, addToCart, removeFromCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
