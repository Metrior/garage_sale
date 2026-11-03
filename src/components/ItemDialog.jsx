import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import CartToggleButton from './CartToggleButton'
import ItemPrice from './ItemPrice'
import PhotoCarousel from './PhotoCarousel'

// `item` stays set while the dialog closes so its content doesn't vanish mid-transition.
export default function ItemDialog({ item, open, onClose }) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  if (!item) return null

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" fullScreen={fullScreen} aria-labelledby="item-dialog-title">
      <DialogTitle id="item-dialog-title" sx={{ pr: 7 }}>
        {item.title}
      </DialogTitle>
      <IconButton aria-label="Close" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>

      <PhotoCarousel
        key={item.id}
        images={item.images}
        title={item.title}
        sx={{ flexShrink: 0, height: { xs: '55vh', sm: '60vh' } }}
      />

      <DialogContent>
        <ItemPrice item={item} sx={{ mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          {item.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <CartToggleButton itemId={item.id} sx={{ width: { xs: '100%', sm: 'auto' } }} />
      </DialogActions>
    </Dialog>
  )
}
