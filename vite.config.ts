import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Version 2, publiée sur https://ccamilleri-ux.github.io/portfolio-apec-v2/
// Routage par hash : aucune règle de réécriture nécessaire.
export default defineConfig({
  base: '/portfolio-apec-v2/',
  plugins: [react()],
})
