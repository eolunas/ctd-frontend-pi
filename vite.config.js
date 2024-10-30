import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  site: "https://eolunas.github.io",
  base: "/ctd-frontend-pi/"
})
