import { useState } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../../context/auth'
import LoginDialog from '../LoginDialog'

// "Admin login" when logged out, "Log out" when logged in. Icon-only on phones to keep the bar on one line.
export default function AccountButton() {
  const { user, signOut } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const iconOnly = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const label = user ? 'Log out' : 'Admin login'
  const icon = user ? <LogoutIcon /> : <LoginIcon />
  const onClick = user ? signOut : () => setLoginOpen(true)

  return (
    <>
      {iconOnly ? (
        <Tooltip title={label}>
          <IconButton color="inherit" aria-label={label} onClick={onClick} edge="end" sx={{ ml: 0.5 }}>
            {icon}
          </IconButton>
        </Tooltip>
      ) : (
        <Button color="inherit" startIcon={icon} onClick={onClick} sx={{ textTransform: 'none', fontWeight: 600, ml: 1 }}>
          {label}
        </Button>
      )}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
