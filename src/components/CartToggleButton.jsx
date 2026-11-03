import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useCart } from '../context/useCart'

export default function CartToggleButton({ itemId, ...buttonProps }) {
  const { addToCart, removeFromCart, isInCart } = useCart()

  return isInCart(itemId) ? (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<RemoveShoppingCartIcon />}
      onClick={() => removeFromCart(itemId)}
      {...buttonProps}
    >
      Remove from cart
    </Button>
  ) : (
    <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => addToCart(itemId)} {...buttonProps}>
      Add to cart
    </Button>
  )
}
