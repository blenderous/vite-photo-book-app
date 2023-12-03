import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://blenderous.github.io/vite-photo-book-app/",
  plugins: [react()],
})
