import { Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/formatPrice'

export default function Header() {
  const { count, total } = useCart()
  const itemsLabel = `${count} ${count === 1 ? 'item' : 'items'}`

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none' }}
        >
          <StorefrontIcon />
          <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
            Garage Sale
          </Typography>
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
      </Toolbar>
    </AppBar>
  )
}
