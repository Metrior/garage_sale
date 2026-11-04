import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchItems } from '../api/items'
import { ItemsContext } from './ItemsContext'

// Loads all items from Supabase once and shares them with every page.
export function ItemsProvider({ children }) {
  const [items, setItems] = useState([])
  // 'loading' until the first fetch finishes, then 'ready'; 'error' if it failed and nothing is loaded.
  const [status, setStatus] = useState('loading')

  // Refetches after the admin changes something. A failed refresh keeps the items already shown.
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

  const value = useMemo(() => ({ items, status, reload, retry }), [items, status, reload, retry])

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
