import { Navigate, Outlet } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useAuth } from '../../context/auth'

// Shows the item forms only to the logged-in admin; everyone else goes to the shop.
// This only hides the UI: the database rules are what actually block non-admins from changing data.
export default function AdminRoute() {
  const { loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <Stack sx={{ alignItems: 'center', py: 8 }}>
        <CircularProgress aria-label="Checking login" />
      </Stack>
    )
  }
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />
}
