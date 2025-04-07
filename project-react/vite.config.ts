import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/top-match': {
        target: 'https://whoyouwebapp-aneqbpgwc2decyd8.canadacentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      }
    }
  }
})
