import type { User } from '@supabase/supabase-js'
import type { Item, ItemsStatus } from './item'

// Values shared through the React contexts in src/context.

export interface AuthContextValue {
  // True until the saved session (if any) has been checked.
  loading: boolean
  user: User | null
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export interface CartContextValue {
  cartItems: Item[]
  count: number
  total: number
  isInCart: (id: string) => boolean
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
}

export interface ItemsContextValue {
  items: Item[]
  status: ItemsStatus
  // Refetches after the admin changes something. A failed refresh keeps the items already shown.
  reload: () => Promise<void>
  // Shows the spinner again and refetches after a failed first load.
  retry: () => void
}
