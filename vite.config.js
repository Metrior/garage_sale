import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Same as the default filter but case-insensitive, so phone photos named *.JPG get resized too.
    imagetools({ include: /\.(heif|avif|jpe?g|png|tiff|webp|gif)\?.*$/i }),
  ],
  // Served from https://metrior.github.io/garage_sale/
  base: '/garage_sale/',
})
