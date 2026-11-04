import { NavLink, Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useCart } from '../../context/cart'
import { formatPrice } from '../../utils/formatPrice'
import AccountButton from '../AccountButton'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/location', label: 'Location' },
]

export default function Header() {
  const { count, total } = useCart()
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
          {NAV_LINKS.map(({ to, label, end }) => (
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
