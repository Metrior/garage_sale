import type { SortValue } from './sort'

// The gallery's search, sort and the admin's "Booked" filter, kept by GalleryRoute and read in
// GalleryPage with useOutletContext<GalleryState>().
export interface GalleryState {
  query: string
  setQuery: (query: string) => void
  sort: SortValue
  setSort: (sort: SortValue) => void
  bookedOnly: boolean
  setBookedOnly: (bookedOnly: boolean) => void
}
