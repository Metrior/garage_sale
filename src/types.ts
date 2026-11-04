import type { Tables, TablesInsert } from './lib/database.types'

// An item for sale, as stored in the `items` table.
export type Item = Tables<'items'>

// What the admin's item form saves; the id and created_at are filled in by the database.
export type ItemFields = Required<Pick<TablesInsert<'items'>, 'title' | 'description' | 'price' | 'tag' | 'images'>>
