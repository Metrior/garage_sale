import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fetchItems } from '../../api/items'
import type { Item, ItemsContextValue, ItemsStatus } from '../../types'
import { useAuth } from '../auth'
import { ItemsContext } from './ItemsContext'

// Loads all items from Supabase and shares them with every page. Booked items are only for the admin.
export function ItemsProvider({ children }: { children: ReactNode }) {
  const { loading: authLoading, isAdmin } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [status, setStatus] = useState<ItemsStatus>('loading')

  const reload = useCallback(
    () =>
      fetchItems().then(
        (rows) => {
          setItems(rows)
          setStatus('ready')
        },
        (error) => {
          console.error('Could not load items', error)
          setStatus((current) => (current === 'ready' ? current : 'error'))
        },
      ),
    [],
  )

  // The database only lets the admin read booked items, so load once the saved session is known and
  // again whenever the admin logs in or out.
  useEffect(() => {
    if (!authLoading) reload()
  }, [authLoading, isAdmin, reload])

  // Also filtered here so they disappear right at logout, before the refetch finishes.
  const visibleItems = useMemo(() => (isAdmin ? items : items.filter((item) => !item.booked_by)), [isAdmin, items])

  const retry = useCallback(() => {
    setStatus('loading')
    reload()
  }, [reload])

  const value = useMemo<ItemsContextValue>(
    () => ({ items: visibleItems, status, reload, retry }),
    [visibleItems, status, reload, retry],
  )

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
