import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createItem, removePhotos, updateItem, uploadPhoto } from '../../api/items'
import { useItems } from '../../context/items'
import type { Item, ItemFields, PickerPhoto } from '../../types'
import { errorMessage } from '../../utils/errorMessage'
import { CURRENCY_SYMBOL } from '../../utils/formatPrice'
import { imageUrl } from '../../utils/imageUrl'
import PhotoPicker from '../PhotoPicker'

// Saved photos have a `key`; newly picked ones have a `file` that is uploaded on save.
type FormPhoto = PickerPhoto & ({ key: string; file?: undefined } | { file: File; key?: undefined })

function validate({ title, price, photos }: { title: string; price: string; photos: FormPhoto[] }) {
  return {
    title: title.trim() ? '' : 'Enter a title',
    price: !price.trim() ? 'Enter a price' : /^\d+$/.test(price.trim()) ? '' : 'Use a whole number, e.g. 50',
    photos: photos.length > 0 ? '' : 'Add at least one photo',
  }
}

// Add form when `item` is undefined, edit form otherwise. Saving goes back to the gallery.
export default function ItemForm({ item }: { item?: Item }) {
  const navigate = useNavigate()
  const { reload } = useItems()
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [price, setPrice] = useState(item ? String(item.price) : '')
  const [tag, setTag] = useState(item?.tag ?? '')
  const [photos, setPhotos] = useState<FormPhoto[]>(() =>
    (item?.images ?? []).map((key) => ({ id: key, key, preview: imageUrl(key, 'thumb') })),
  )
  const [showErrors, setShowErrors] = useState(false)
  const [saving, setSaving] = useState(false)
  const [progress, setProgress] = useState('')
  const [saveError, setSaveError] = useState('')

  // Previews of picked files are blob: URLs that hold the file in memory until revoked.
  const blobUrls = useRef<string[]>([])
  useEffect(() => {
    const urls = blobUrls.current
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const errors = validate({ title, price, photos })
  const shownErrors: Partial<typeof errors> = showErrors ? errors : {}

  const addPhotos = (files: File[]) => {
    const added = files.map((file): FormPhoto => {
      const preview = URL.createObjectURL(file)
      blobUrls.current.push(preview)
      return { id: preview, file, preview }
    })
    setPhotos((current) => [...current, ...added])
  }
  const removePhoto = (id: string) => setPhotos((current) => current.filter((photo) => photo.id !== id))
  const makeCover = (id: string) =>
    setPhotos((current) => [...current.filter((photo) => photo.id === id), ...current.filter((photo) => photo.id !== id)])

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).some(Boolean)) {
      setShowErrors(true)
      return
    }

    setSaving(true)
    setSaveError('')
    const uploadedKeys: string[] = []
    try {
      const newCount = photos.filter((photo) => photo.file).length
      const keys: string[] = []
      for (const photo of photos) {
        if (photo.key !== undefined) {
          keys.push(photo.key)
          continue
        }
        setProgress(`Uploading photo ${uploadedKeys.length + 1} of ${newCount}…`)
        const key = await uploadPhoto(photo.file)
        uploadedKeys.push(key)
        keys.push(key)
      }

      setProgress('Saving…')
      const fields: ItemFields = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price.trim()),
        tag: tag.trim() || null,
        images: keys,
      }
      if (item) {
        await updateItem(item.id, fields)
        await removePhotos(item.images.filter((key) => !keys.includes(key)))
      } else {
        await createItem(fields)
      }
      await reload()
      navigate('/')
    } catch (error) {
      console.error(error)
      // Nothing points at the photos uploaded during this attempt, so they're deleted; a retry uploads them again.
      await removePhotos(uploadedKeys)
      setSaveError(errorMessage(error, 'Saving failed. Try again.'))
      setSaving(false)
      setProgress('')
    }
  }

  return (
    <Paper component="form" variant="outlined" onSubmit={handleSubmit} noValidate sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={3}>
        <PhotoPicker
          photos={photos}
          onAdd={addPhotos}
          onRemove={removePhoto}
          onMakeCover={makeCover}
          error={shownErrors.photos}
          disabled={saving}
        />

        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={Boolean(shownErrors.title)}
          helperText={shownErrors.title}
          disabled={saving}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={saving}
          multiline
          minRows={3}
          fullWidth
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            error={Boolean(shownErrors.price)}
            helperText={shownErrors.price}
            disabled={saving}
            required
            slotProps={{
              htmlInput: { inputMode: 'numeric' },
              input: { startAdornment: <InputAdornment position="start">{CURRENCY_SYMBOL}</InputAdornment> },
            }}
            sx={{ width: { sm: 200 } }}
          />
          <TextField
            label="Price note (optional)"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            helperText="Shown under the price, e.g. “за штуку”"
            disabled={saving}
            sx={{ flexGrow: 1 }}
          />
        </Stack>

        {saveError && <Alert severity="error">{saveError}</Alert>}

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          {progress && (
            <Typography variant="body2" color="text.secondary" role="status" sx={{ mr: 'auto' }}>
              {progress}
            </Typography>
          )}
          <Button component={RouterLink} to="/" color="secondary" disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large" loading={saving}>
            {item ? 'Save changes' : 'Add item'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
