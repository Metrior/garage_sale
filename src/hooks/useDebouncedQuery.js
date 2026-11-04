import { useEffect, useState } from 'react'

const SEARCH_DELAY_MS = 300

// The search query to filter by. It catches up with what's typed once typing pauses, so the item
// grid isn't re-filtered on every keystroke, but clearing the search shows everything right away.
export function useDebouncedQuery(query) {
  const [debounced, setDebounced] = useState(query)
  const isEmpty = !query.trim()

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), isEmpty ? 0 : SEARCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [query, isEmpty])

  return isEmpty ? '' : debounced
}
