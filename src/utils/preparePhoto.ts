import type { PhotoBox, PhotoSize } from '../types'
import { PHOTO_SIZES } from './photoFiles'

// Makes the two stored sizes of a photo in the browser. Drawing it onto a canvas and re-encoding
// it drops all metadata (including GPS location) from phone photos before they are uploaded.

const WEBP_QUALITY = 0.82
const JPEG_QUALITY = 0.85

function encode(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

async function resize(bitmap: ImageBitmap, { width, height, fit }: PhotoBox): Promise<Blob> {
  const scale = (fit === 'outside' ? Math.max : Math.min)(width / bitmap.width, height / bitmap.height)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * Math.min(1, scale)))
  canvas.height = Math.max(1, Math.round(bitmap.height * Math.min(1, scale)))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('This browser could not convert the photo')
  context.imageSmoothingQuality = 'high'
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

  // Browsers that can't encode WebP (older Safari) return PNG instead, which is far too big for photos.
  const webp = await encode(canvas, 'image/webp', WEBP_QUALITY)
  if (webp?.type === 'image/webp') return webp
  const jpeg = await encode(canvas, 'image/jpeg', JPEG_QUALITY)
  if (!jpeg) throw new Error('This browser could not convert the photo')
  return jpeg
}

// Returns { thumb: Blob, full: Blob }.
export async function preparePhoto(file: File): Promise<Record<PhotoSize, Blob>> {
  let bitmap: ImageBitmap
  try {
    // 'from-image' applies the phone's rotation tag, which is dropped along with the other metadata.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error(`Couldn't read "${file.name}". Use a JPEG, PNG or WebP photo.`)
  }
  try {
    const entries = await Promise.all(
      Object.entries(PHOTO_SIZES).map(async ([size, box]) => [size, await resize(bitmap, box)] as const),
    )
    return Object.fromEntries(entries) as Record<PhotoSize, Blob>
  } finally {
    bitmap.close()
  }
}
