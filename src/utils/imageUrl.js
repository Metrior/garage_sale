import { SUPABASE_URL } from '../config'
import { PHOTO_BUCKET, photoPath } from './photoFiles'

export function isExternalImage(name) {
  return /^(https?:)?\/\//.test(name) || /^(data|blob):/.test(name)
}

// `name` is a photo key from an item's `images` (or a full URL, used as-is). `size` is 'thumb' or 'full'.
export function imageUrl(name, size = 'thumb') {
  if (isExternalImage(name)) return name
  const path = photoPath(name, size).split('/').map(encodeURIComponent).join('/')
  return `${SUPABASE_URL}/storage/v1/object/public/${PHOTO_BUCKET}/${path}`
}
