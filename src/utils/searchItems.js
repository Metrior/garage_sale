// Case-insensitive, treats "ё" as "е" and ignores extra spaces, so "елка" finds "Ёлка".
function normalize(text) {
  return text.toLocaleLowerCase('ru').replaceAll('ё', 'е').replace(/\s+/g, ' ').trim()
}

export function searchByTitle(items, query) {
  const needle = normalize(query)
  if (!needle) return items
  return items.filter((item) => normalize(item.title).includes(needle))
}
