// Item photos live in src/images and items.json refers to them by file name. At build time
// vite-imagetools makes two resized WebP copies of each one (metadata such as GPS stripped):
// a small one for cards and the cart, and a large one for the photo viewer. The original
// files are never published.
const thumbnails = import.meta.glob('../images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: { w: 640, h: 640, fit: 'outside', format: 'webp' },
})

const fullSize = import.meta.glob('../images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: { w: 1600, h: 1600, fit: 'inside', format: 'webp' },
})

// File names are normalized so Cyrillic names match however the OS or editor encoded them.
const byFileName = (modules) =>
  new Map(Object.entries(modules).map(([path, url]) => [path.split('/').pop().normalize('NFC'), url]))

const SIZES = { thumb: byFileName(thumbnails), full: byFileName(fullSize) }

// `name` is a file name in src/images or a full URL (used as-is). `size` is 'thumb' or 'full'.
export function imageUrl(name, size = 'thumb') {
  if (/^(https?:)?\/\//.test(name) || name.startsWith('data:')) return name
  const url = SIZES[size].get(name.normalize('NFC'))
  if (!url) console.error(`Photo "${name}" from items.json was not found in src/images`)
  return url ?? name
}
