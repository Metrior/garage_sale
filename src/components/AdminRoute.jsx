import { useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useAuth } from '../context/useAuth'
import { DEFAULT_SORT } from '../utils/sortItems'

// Shows the admin pages only to the logged-in admin; everyone else goes to the shop.
// This only hides the UI: the database rules are what actually block non-admins from changing data.
export default function AdminRoute() {
  const { loading, isAdmin } = useAuth()
  // The admin list's search and sort live here, not in AdminPage, so they are still set after
  // opening an item's form and coming back.
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(DEFAULT_SORT)

  if (loading) {
    return (
      <Stack sx={{ alignItems: 'center', py: 8 }}>
        <CircularProgress aria-label="Checking login" />
      </Stack>
    )
  }
  return isAdmin ? <Outlet context={{ query, setQuery, sort, setSort }} /> : <Navigate to="/" replace />
}
