// The stored sizes of every photo; PHOTO_SIZES in src/utils/photoFiles.ts gives each one's box.
export type PhotoSize = 'thumb' | 'full'

export interface PhotoBox {
  width: number
  height: number
  // 'outside' covers the box (the shorter side fits it), 'inside' fits within it (the longer side fits it).
  fit: 'outside' | 'inside'
}

// A tile in PhotoPicker: `preview` is the image URL shown and `id` identifies it in the callbacks.
export interface PickerPhoto {
  id: string
  preview: string
}
