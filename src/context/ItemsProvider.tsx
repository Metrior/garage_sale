import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fetchItems } from '../api/items'
import type { Item } from '../types'
import { ItemsContext, type ItemsContextValue, type ItemsStatus } from './ItemsContext'

// Loads all items from Supabase once and shares them with every page.
export function ItemsProvider({ children }: { children: ReactNode }) {
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

  useEffect(() => {
    reload()
  }, [reload])

  const retry = useCallback(() => {
    setStatus('loading')
    reload()
  }, [reload])

  const value = useMemo<ItemsContextValue>(() => ({ items, status, reload, retry }), [items, status, reload, retry])

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
