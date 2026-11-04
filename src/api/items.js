import { supabase } from '../lib/supabase'
import { PHOTO_BUCKET, PHOTO_CACHE_SECONDS, PHOTO_SIZES, photoPath } from '../utils/photoFiles'
import { isExternalImage } from '../utils/imageUrl'
import { preparePhoto } from '../utils/preparePhoto'

const COLUMNS = 'id, title, description, price, tag, images, created_at'

// Newest first; the gallery applies its own sort on top.
export async function fetchItems() {
  const { data, error } = await supabase.from('items').select(COLUMNS).order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// `fields` is { title, description, price, tag, images }.
export async function createItem(fields) {
  const { data, error } = await supabase.from('items').insert(fields).select(COLUMNS).single()
  if (error) throw error
  return data
}

export async function updateItem(id, fields) {
  const { data, error } = await supabase.from('items').update(fields).eq('id', id).select(COLUMNS)
  if (error) throw error
  // The database rules silently skip rows the user may not change, so check that one was updated.
  if (data.length === 0) throw new Error("The item wasn't saved. It may have been deleted, or you may need to log in again.")
  return data[0]
}

export async function deleteItem(item) {
  const { data, error } = await supabase.from('items').delete().eq('id', item.id).select('id')
  if (error) throw error
  if (data.length === 0) throw new Error("The item wasn't deleted. It may already be gone, or you may need to log in again.")
  await removePhotos(item.images)
}

// Resizes a photo, uploads both sizes and returns its new key for the item's `images`.
export async function uploadPhoto(file) {
  const blobs = await preparePhoto(file)
  const key = crypto.randomUUID()
  const uploaded = []
  try {
    for (const size of Object.keys(PHOTO_SIZES)) {
      const path = photoPath(key, size)
      const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blobs[size], {
        contentType: blobs[size].type,
        cacheControl: PHOTO_CACHE_SECONDS,
      })
      if (error) throw new Error(`Uploading "${file.name}" failed: ${error.message}`)
      uploaded.push(path)
    }
  } catch (error) {
    await supabase.storage.from(PHOTO_BUCKET).remove(uploaded)
    throw error
  }
  return key
}

// Best effort: a leftover file only costs a little storage, so failures are logged, not thrown.
export async function removePhotos(keys) {
  const paths = keys
    .filter((key) => !isExternalImage(key))
    .flatMap((key) => Object.keys(PHOTO_SIZES).map((size) => photoPath(key, size)))
  if (paths.length === 0) return
  const { error } = await supabase.storage.from(PHOTO_BUCKET).remove(paths)
  if (error) console.error('Could not delete photos from storage', paths, error)
}
