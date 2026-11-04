import Dialog from '@mui/material/Dialog'
import type { Item } from '../../types'
import DeleteConfirmation from '../DeleteConfirmation'

interface DeleteItemDialogProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

// `item` stays set while the dialog closes so its text doesn't vanish mid-transition.
export default function DeleteItemDialog({ item, open, onClose }: DeleteItemDialogProps) {
  if (!item) return null
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      role="alertdialog"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DeleteConfirmation item={item} onClose={onClose} />
    </Dialog>
  )
}
