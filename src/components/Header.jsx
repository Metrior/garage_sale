import { useState } from 'react'
import { NavLink, Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/formatPrice'
import LoginDialog from './LoginDialog'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/location', label: 'Location' },
]
const ADMIN_LINK = { to: '/admin', label: 'Admin' }

// "Admin login" when logged out, "Log out" when logged in. Icon-only on phones to keep the bar on one line.
function AccountButton() {
  const { user, signOut } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const iconOnly = useMediaQuery((theme) => theme.breakpoints.down('sm'))
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

export default function Header() {
  const { count, total } = useCart()
  const { isAdmin } = useAuth()
  const navLinks = isAdmin ? [...NAV_LINKS, ADMIN_LINK] : NAV_LINKS
  const itemsLabel = `${count} ${count === 1 ? 'item' : 'items'}`

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          aria-label="Garage Sale"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none' }}
        >
          <StorefrontIcon />
          {/* Hidden on narrow phones so the nav links and cart still fit on one line. */}
          <Typography variant="h6" component="span" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'inline' } }}>
            Garage Sale
          </Typography>
        </Box>

        <Box component="nav" aria-label="Main" sx={{ display: 'flex', gap: 0.5, ml: { xs: 1, sm: 3 } }}>
          {navLinks.map(({ to, label, end }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              end={end}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 0,
                px: { xs: 1, sm: 1.5 },
                '&.active': { bgcolor: 'primary.dark' },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={RouterLink}
          to="/cart"
          color="inherit"
          aria-label={`Cart: ${itemsLabel}, ${formatPrice(total)}`}
          startIcon={
            <Badge badgeContent={count} color="secondary" showZero>
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{ textTransform: 'none', fontWeight: 600, '& .MuiButton-startIcon': { mr: 1.5 } }}
        >
          {formatPrice(total)}
        </Button>
        <AccountButton />
      </Toolbar>
    </AppBar>
  )
}
