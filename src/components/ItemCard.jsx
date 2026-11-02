import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/formatPrice'

export default function ItemCard({ item }) {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const inCart = isInCart(item.id)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={item.image}
        alt={item.title}
        loading="lazy"
        sx={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h6" component="h2">
            {item.title}
          </Typography>
          <Typography variant="h6" component="p" color="secondary" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
            {formatPrice(item.price)}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {inCart ? (
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<RemoveShoppingCartIcon />}
            onClick={() => removeFromCart(item.id)}
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCart(item.id)}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
