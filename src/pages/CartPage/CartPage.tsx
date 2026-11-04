import { Link as RouterLink } from 'react-router'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import TelegramIcon from '@mui/icons-material/Telegram'
import EmptyCart from '../../components/EmptyCart'
import { SELLER_NAME } from '../../config'
import { useCart } from '../../context/cart'
import { formatItemPrice, formatPrice } from '../../utils/formatPrice'
import { imageUrl } from '../../utils/imageUrl'
import { buildTelegramCheckoutUrl } from '../../utils/telegram'

export default function CartPage() {
  const { cartItems, total, removeFromCart } = useCart()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" color="secondary" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Continue shopping
      </Button>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Your cart
      </Typography>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Paper variant="outlined">
          <List disablePadding>
            {cartItems.map((item, index) => (
              <ListItem
                key={item.id}
                divider={index < cartItems.length - 1}
                sx={{ py: 2 }}
                secondaryAction={
                  <IconButton edge="end" aria-label={`Remove ${item.title}`} onClick={() => removeFromCart(item.id)}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Avatar variant="rounded" src={imageUrl(item.images[0], 'thumb')} alt={item.title} sx={{ width: 72, height: 72 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={formatItemPrice(item)}
                  sx={{ '& .MuiListItemText-primary': { fontWeight: 600 } }}
                />
              </ListItem>
            ))}
          </List>

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ p: 2, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            <Typography variant="h6">
              Total ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}):{' '}
              <strong>{formatPrice(total)}</strong>
            </Typography>
            <Stack spacing={0.5} sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' } }}>
              <Button
                component="a"
                href={buildTelegramCheckoutUrl(cartItems, total)}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<TelegramIcon />}
                aria-describedby="checkout-hint"
              >
                Checkout
              </Button>
              <Typography id="checkout-hint" variant="caption" color="text.secondary" sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                Opens a Telegram chat with {SELLER_NAME} to arrange the purchase
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Container>
  )
}
