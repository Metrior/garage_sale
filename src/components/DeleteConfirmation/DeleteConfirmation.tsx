import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { deleteItem } from '../../api/items'
import { useItems } from '../../context/items'
import type { Item } from '../../types'
import { errorMessage } from '../../utils/errorMessage'

// The content of DeleteItemDialog. It's mounted only while the dialog is open, so the error and busy
// state reset every time it opens.
export default function DeleteConfirmation({ item, onClose }: { item: Item; onClose: () => void }) {
  const { reload } = useItems()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const photoCount = item.images.length

  const confirmDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      await deleteItem(item)
      await reload()
      onClose()
    } catch (err) {
      console.error(err)
      setError(errorMessage(err, 'Deleting failed. Try again.'))
      setDeleting(false)
    }
  }

  return (
    <>
      <DialogTitle id="delete-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon color="error" />
        Delete this item?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          <strong>“{item.title}”</strong> and its {photoCount} {photoCount === 1 ? 'photo' : 'photos'} will be deleted
          permanently, and it will disappear from visitors&apos; carts. This can&apos;t be undone.
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary" disabled={deleting} autoFocus>
          Cancel
        </Button>
        <Button onClick={confirmDelete} variant="contained" color="error" loading={deleting}>
          Delete
        </Button>
      </DialogActions>
    </>
  )
}
