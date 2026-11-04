import { useState } from 'react'
import { Outlet } from 'react-router'
import { DEFAULT_SORT, type SortValue } from '../utils/sortItems'

// Read in GalleryPage with useOutletContext<GalleryState>().
export interface GalleryState {
  query: string
  setQuery: (query: string) => void
  sort: SortValue
  setSort: (sort: SortValue) => void
}

// Wraps the gallery and the admin's item forms. The gallery's search and sort live here, not in
// GalleryPage, so they are still set after the admin opens an item's form and comes back.
export default function GalleryRoute() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT)
  const state: GalleryState = { query, setQuery, sort, setSort }
  return <Outlet context={state} />
}
