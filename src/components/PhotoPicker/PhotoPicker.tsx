import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import CloseIcon from '@mui/icons-material/Close'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import type { PickerPhoto } from '../../types'

const tileSx = { position: 'relative', aspectRatio: '1 / 1', borderRadius: 2, overflow: 'hidden' }
const overlayButtonSx = {
  position: 'absolute',
  top: 4,
  bgcolor: 'rgba(0, 0, 0, 0.6)',
  color: 'common.white',
  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
}

interface PhotoPickerProps {
  // In display order; the first is the cover.
  photos: PickerPhoto[]
  onAdd: (files: File[]) => void
  onRemove: (id: string) => void
  onMakeCover: (id: string) => void
  error?: string
  disabled?: boolean
}

export default function PhotoPicker({ photos, onAdd, onRemove, onMakeCover, error, disabled }: PhotoPickerProps) {
  return (
    <Box>
      <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600 }}>
        Photos
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        The first photo is the cover. Photos are resized and their location data is removed before upload.
      </Typography>

      <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
        {photos.map((photo, index) => (
          <Box key={photo.id} sx={{ ...tileSx, bgcolor: 'action.hover' }}>
            <Box
              component="img"
              src={photo.preview}
              alt={`Photo ${index + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {index === 0 ? (
              <Chip label="Cover" size="small" color="primary" sx={{ position: 'absolute', left: 6, bottom: 6, fontWeight: 600 }} />
            ) : (
              <Tooltip title="Make cover">
                <IconButton
                  size="small"
                  aria-label={`Make photo ${index + 1} the cover`}
                  onClick={() => onMakeCover(photo.id)}
                  disabled={disabled}
                  sx={{ ...overlayButtonSx, left: 4 }}
                >
                  <StarBorderIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Remove">
              <IconButton
                size="small"
                aria-label={`Remove photo ${index + 1}`}
                onClick={() => onRemove(photo.id)}
                disabled={disabled}
                sx={{ ...overlayButtonSx, right: 4 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ))}

        <Button
          component="label"
          variant="outlined"
          color={error ? 'error' : 'secondary'}
          disabled={disabled}
          sx={{ ...tileSx, flexDirection: 'column', gap: 0.5, borderStyle: 'dashed', borderWidth: 2, textTransform: 'none' }}
        >
          <AddPhotoAlternateOutlinedIcon fontSize="large" />
          Add photos
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => {
              onAdd([...(event.target.files ?? [])])
              // Lets the same file be picked again after removing it.
              event.target.value = ''
            }}
          />
        </Button>
      </Box>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  )
}
