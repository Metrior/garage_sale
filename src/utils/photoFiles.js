// Supabase Storage bucket that holds item photos (created in supabase/migrations).
export const PHOTO_BUCKET = 'item-photos'

// Every photo is stored in two sizes, neither ever larger than the original:
// `thumb` for cards and the cart (shorter side 640px, cards crop it to a square) and
// `full` for the photo viewer (longer side 1600px).
export const PHOTO_SIZES = {
  thumb: { width: 640, height: 640, fit: 'outside' },
  full: { width: 1600, height: 1600, fit: 'inside' },
}

// An item's `images` holds photo keys. Each key is a folder with one file per size. The files have
// no extension because they can be WebP or JPEG; Storage serves them with the right content type.
export function photoPath(key, size) {
  return `${key}/${size}`
}

// Photo files are never overwritten (new photos get new keys), so browsers may cache them for a year.
export const PHOTO_CACHE_SECONDS = '31536000'
