import { Link as RouterLink } from 'react-router'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

export default function EmptyCart() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', py: 8, textAlign: 'center' }}>
      <RemoveShoppingCartIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h6">Your cart is empty</Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Browse items
      </Button>
    </Stack>
  )
}
