import { Link as RouterLink } from 'react-router'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import type { Item } from '../../types'

// Shown on each card instead of "Add to cart" while the admin is logged in.
export default function ItemAdminActions({ item, onDelete }: { item: Item; onDelete: (item: Item) => void }) {
  return (
    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
      <Button
        component={RouterLink}
        to={`/edit/${encodeURIComponent(item.id)}`}
        variant="outlined"
        color="secondary"
        startIcon={<EditOutlinedIcon />}
        sx={{ flex: 1 }}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete(item)}
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlinedIcon />}
        sx={{ flex: 1 }}
      >
        Delete
      </Button>
    </Stack>
  )
}
