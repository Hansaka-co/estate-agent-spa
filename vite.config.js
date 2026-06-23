import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/estate-agent-spa/',
  plugins: [react()],
})