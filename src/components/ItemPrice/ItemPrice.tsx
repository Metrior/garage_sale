import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { useAuth } from '../../context/auth'
import type { Item } from '../../types'
import { PER_ITEM_LABEL, formatPrice } from '../../utils/formatPrice'

// Price with chips underneath: "Booked" (admin only, hover shows by whom), "per item" and the item's optional tag.
export default function ItemPrice({
  item,
  sx,
}: {
  item: Pick<Item, 'price' | 'per_item' | 'tag' | 'booked_by'>
  sx?: SxProps<Theme>
}) {
  const { isAdmin } = useAuth()
  const bookedBy = isAdmin ? item.booked_by : null
  const chips = [item.per_item ? PER_ITEM_LABEL : null, item.tag].filter((label): label is string => Boolean(label))
  return (
    <Box sx={sx}>
      <Typography variant="h6" component="p" color="secondary" sx={{ fontWeight: 700 }}>
        {formatPrice(item.price)}
      </Typography>
      {(bookedBy || chips.length > 0) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
          {bookedBy && (
            <Tooltip arrow title={`Booked by ${bookedBy}`}>
              <Chip label="Booked" size="small" variant="outlined" color="booked" sx={{ bgcolor: 'booked.light' }} />
            </Tooltip>
          )}
          {chips.map((label) => (
            <Chip key={label} label={label} size="small" variant="outlined" color="secondary" />
          ))}
        </Box>
      )}
    </Box>
  )
}
