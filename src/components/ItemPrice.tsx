import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { Item } from '../types'
import { formatPrice } from '../utils/formatPrice'

// Price with the item's optional tag (e.g. "за штуку") shown underneath.
export default function ItemPrice({ item, sx }: { item: Pick<Item, 'price' | 'tag'>; sx?: SxProps<Theme> }) {
  return (
    <Box sx={sx}>
      <Typography variant="h6" component="p" color="secondary" sx={{ fontWeight: 700 }}>
        {formatPrice(item.price)}
      </Typography>
      {item.tag && <Chip label={item.tag} size="small" variant="outlined" color="secondary" sx={{ mt: 0.5 }} />}
    </Box>
  )
}
