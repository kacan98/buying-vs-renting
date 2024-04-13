import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/buying-vs-renting/',
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@mui/x-charts'],
  }
})

