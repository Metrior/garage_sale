import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { Item } from '../../types'
import { PER_ITEM_LABEL, formatPrice } from '../../utils/formatPrice'

// Price with a "per item" chip and the item's optional tag shown underneath.
export default function ItemPrice({ item, sx }: { item: Pick<Item, 'price' | 'per_item' | 'tag'>; sx?: SxProps<Theme> }) {
  const chips = [item.per_item ? PER_ITEM_LABEL : null, item.tag].filter((label): label is string => Boolean(label))
  return (
    <Box sx={sx}>
      <Typography variant="h6" component="p" color="secondary" sx={{ fontWeight: 700 }}>
        {formatPrice(item.price)}
      </Typography>
      {chips.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
          {chips.map((label) => (
            <Chip key={label} label={label} size="small" variant="outlined" color="secondary" />
          ))}
        </Box>
      )}
    </Box>
  )
}
