import { useState } from 'react'
import { Outlet } from 'react-router'
import type { GalleryState, SortValue } from '../../types'
import { DEFAULT_SORT } from '../../utils/sortItems'

// Wraps the gallery and the admin's item forms. The gallery's search and sort live here, not in
// GalleryPage, so they are still set after the admin opens an item's form and comes back.
export default function GalleryRoute() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT)
  const state: GalleryState = { query, setQuery, sort, setSort }
  return <Outlet context={state} />
}
