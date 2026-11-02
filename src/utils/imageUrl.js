// Full URLs are used as-is; local paths like "images/lamp.jpg" or "/images/lamp.jpg"
// point to files in public/ and are prefixed with the site's base path.
export function imageUrl(path) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
